import torch
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, MarianMTModel, MarianTokenizer

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

class GeneratedText(BaseModel):
    generated_text: str

MODEL_PATH = "model"
TOKENIZER_PATH = "tokenizer"
TRANSLATOR_MODEL_NAME = "Helsinki-NLP/opus-mt-en-ru"

# Загрузка модели и токенизатора
def load_model():
    print("Загрузка модели...")
    model_name = "DBCMLAB/Llama-3-instruction-constructionsafety-layertuning"
    access_token = "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"

    tokenizer = AutoTokenizer.from_pretrained(model_name, token=access_token)
    tokenizer.pad_token = tokenizer.eos_token
    tokenizer.save_pretrained(TOKENIZER_PATH)
    print("Токенизатор загружен.")

    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        token=access_token,
        torch_dtype="auto",
        device_map="auto",
    )
    model.save_pretrained(MODEL_PATH, save_config=False, save_functional=False, push_to_hub=False, safe_serialization=False)
    print("Модель загружена.")

    print("Создание пайплайна...")
    pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, torch_dtype=torch.bfloat16, device_map="auto")
    print("Пайплайн создан.")

    return pipe

# Загрузка модели для перевода
def load_translator():
    print("Загрузка модели перевода...")
    translator_model = MarianMTModel.from_pretrained(TRANSLATOR_MODEL_NAME)
    translator_tokenizer = MarianTokenizer.from_pretrained(TRANSLATOR_MODEL_NAME)
    print("Модель перевода загружена.")
    return pipeline("translation", model=translator_model, tokenizer=translator_tokenizer)

# Загрузка моделей при старте приложения
pipe = load_model()
translator = load_translator()

@app.post("/generate_text", response_model=GeneratedText)
async def generate_text(request: Request, data: Question):
    user_question = data.question  # Получите вопрос от фронтенда

    # Печать входящего запроса для диагностики
    print(f"Received request: {request.headers}\nBody: {await request.body()}")

    # Форматирование сообщения
    try:
        formatted_message = f"<|user|>: {user_question}\n<|bot|>:"  # Используем простой формат
        print("Сообщение отформатировано.")
    except Exception as e:
        print(f"Ошибка при форматировании сообщения: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при форматировании сообщения")

    # Генерация текста
    try:
        outputs = pipe(formatted_message, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
        generated_text = outputs[0]["generated_text"].replace(formatted_message, "").strip()
        print(f"Сгенерированный текст: {generated_text}")
        print("Текст сгенерирован.")
    except Exception as e:
        print(f"Ошибка при генерации текста: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при генерации текста")

    # Перевод текста на русский
    try:
        translated_text = translator(generated_text, max_length=512)[0]['translation_text']
        print(f"Переведенный текст: {translated_text}")
    except Exception as e:
        print(f"Ошибка при переводе текста: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при переводе текста")

    return {"generated_text": translated_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
