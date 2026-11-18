"use client";

import { useState } from "react";

interface StoredResponse {
  timestamp: string;
  data: {
    isAvailable: boolean | null;
    date: string | null;
    time: string;
    food: string[];
    movie: string;
    excitement: number;
  };
}

export default function AdminPage() {
  const [responses, setResponses] = useState<StoredResponse[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setResponses([
            {
              timestamp: new Date().toISOString(),
              data: data,
            },
          ]);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-3xl mx-auto w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Ответы на приглашение</h1>

      <div className="mb-8">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
        />
      </div>

      {responses.length === 0 ? (
        <p>Загрузите JSON-файл с ответом, чтобы посмотреть его!</p>
      ) : (
        responses.map((response) => (
          <div
            key={response.timestamp}
            className="mb-8 p-4 border rounded bg-white shadow-lg"
          >
            <p className="text-lg font-semibold mb-2">
              Время ответа:{" "}
              {new Date(response.timestamp).toLocaleString("ru-RU")}
            </p>
            <div className="space-y-2 text-left">
              <p>
                Дата:{" "}
                {response.data.date
                  ? new Date(response.data.date).toLocaleDateString("ru-RU")
                  : "Не выбрано"}
              </p>
              <p>Время: {response.data.time || "Не выбрано"}</p>
              <p>
                Еда: {response.data.food.join(", ") || "Не выбрано"}
              </p>
              <p>Фильм: {response.data.movie || "Не выбрано"}</p>
              <p>Уровень предвкушения: {response.data.excitement}/100</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
