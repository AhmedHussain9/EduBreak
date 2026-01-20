from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import os
from pydub import AudioSegment
import librosa
import numpy as np
import tempfile

app = FastAPI()

# السماح بالوصول من أي مصدر
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# ربط مجلد static
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return JSONResponse({"message": "API تعمل!"})

@app.post("/analyze")
async def analyze(audio: UploadFile = File(...)):
    try:
        # حفظ الملف مؤقتًا
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
            tmp.write(await audio.read())
            temp_webm = tmp.name

        # تحويل webm إلى wav باستخدام pydub
        temp_wav = temp_webm.replace(".webm", ".wav")
        sound = AudioSegment.from_file(temp_webm, format="webm")
        sound.export(temp_wav, format="wav")

        # تحليل الصوت باستخدام librosa
        y, sr = librosa.load(temp_wav, sr=None)
        rms = librosa.feature.rms(y=y)[0]

        # تحديد الصمت
        threshold = 0.02  # أقل من هذا RMS تعتبر صمت
        silent_frames = np.sum(rms < threshold)
        total_frames = len(rms)
        silence_ratio = silent_frames / total_frames

        # تحديد التأتأة: إذا كانت نسبة الصمت أو التوقفات عالية
        stutter_detected = silence_ratio > 0.15  # يمكن تعديل هذه النسبة للتجربة

        # حذف الملفات المؤقتة بعد التحليل
        os.remove(temp_webm)
        os.remove(temp_wav)

        if stutter_detected:
            return {
                "result": "⚠️ هناك مؤشرات واضحة للتأتأة، ننصحك بالتمرين.",
                "video": True
            }
        else:
            return {
                "result": "✅ لا توجد تأتأة واضحة.",
                "video": False
            }

    except Exception as e:
        return {"error": f"❌ حدث خطأ أثناء تحليل الصوت: {str(e)}"}
