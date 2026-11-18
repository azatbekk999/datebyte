"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Coffee, Film, Utensils, Clock } from "lucide-react";
import confetti from "canvas-confetti";
import ThemedCard from "@/components/ThemedCard";
import Sparkles from "@/components/Sparkles";
import FloatingOrbs from "@/components/FloatingOrbs";
import FairyFooter from "@/components/FairyFooter";
import StepCard from "@/components/StepCard";
import SelectButton from "@/components/SelectButton";

interface Answers {
  isAvailable: boolean | null;
  date: Date | null;
  time: string;
  food: string[];
  movie: string;
  excitement: number;
}

const HeartBackground = dynamic(() => import("@/components/HeartBackground"), {
  ssr: false,
});

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

const isWeekday = (date: Date | null) => {
  if (!date) return false;
  const day = date.getDay();
  return day >= 1 && day <= 5;
};

const isWorkHour = (hour: string) => {
  const h = Number(hour);
  return h >= 13 && h <= 22;
};

const isWorkTime = (date: Date | null, hour: string) =>
  isWeekday(date) && isWorkHour(hour);

export default function EnchantingDateProposalApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    isAvailable: null,
    date: null,
    time: "",
    food: [],
    movie: "",
    excitement: 50,
  });

  const [hour, setHour] = useState<string>("19");
  const [minute, setMinute] = useState<string>("00");
  const [showCustomMovie, setShowCustomMovie] = useState(false);
  const [customMovie, setCustomMovie] = useState("");

  useEffect(() => {
    setAnswers((prev) => ({ ...prev, time: `${hour}:${minute}` }));
  }, [hour, minute]);

  const handleAnswer = (key: keyof Answers, value: Answers[keyof Answers]) => {
    setAnswers({ ...answers, [key]: value });
    setStep(step + 1);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    try {
      return d.toLocaleDateString("ru-RU", {
        month: "long",
        day: "numeric",
      });
    } catch {
      return d.toDateString();
    }
  };

  const steps = [
    <motion.div key="step0" className="text-center" {...fadeInUp}>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
        Пойдёшь со мной на свидание?
      </h1>
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        src="https://media1.tenor.com/m/59regbBE_kwAAAAd/tkthao219-bubududu.gif"
        alt="Милый мишка зовёт на свидание"
        className="w-full max-w-xs sm:max-w-md mx-auto mb-4 rounded-lg shadow-lg"
      />
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <Button
          onClick={() => {
            handleAnswer("isAvailable", true);
            triggerConfetti();
          }}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Да, с удовольствием!
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-pink-300 text-pink-500 hover:bg-pink-100 font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Нет
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-pink-50 border-2 border-pink-300">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-pink-600">
                Никаких &quot;НЕЕЕЕЕТ&quot;
              </DialogTitle>
              <DialogDescription className="text-base sm:text-lg text-pink-500">
                Ты обязательно пойдёшь со мной!
              </DialogDescription>
            </DialogHeader>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src="https://media1.tenor.com/m/WqpiNQKLg48AAAAC/no.gif"
              alt="Мишка говорит «нет»"
              className="w-full max-w-xs sm:max-w-md mx-auto mb-4 rounded-lg shadow-lg"
            />
            <Button
              onClick={() => {
                handleAnswer("isAvailable", true);
                triggerConfetti();
              }}
              className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Ладно, я приду!
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>,

    <motion.div key="step1" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={1} totalSteps={6}>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          УРАААААА, КОГДА ПОЙДЁМ?
        </h2>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="https://media.tenor.com/WiQQRwR2QFAAAAAi/cute-panda.gif"
          alt="Радостная панда"
          className="w-full max-w-xs sm:max-w-md mx-auto mb-4 sm:mb-6 rounded-2xl shadow-2xl shadow-pink-300/30"
        />
        <div className="mb-6 p-2 sm:p-4 bg-white rounded-lg shadow-lg overflow-x-auto">
          <Calendar
            mode="single"
            selected={answers.date || undefined}
            onSelect={(date) => setAnswers({ ...answers, date: date || null })}
            disabled={{ before: new Date() }}
            fromMonth={new Date()}
            className="mx-auto mb-4 w-full max-w-md"
          />
          <p className="mt-4 text-sm sm:text-base text-pink-600 leading-relaxed">
            С понедельника по пятницу я работаю с 13:00 до 22:00, поэтому это
            время недоступно
          </p>
          <div className="flex gap-2 sm:gap-3 justify-center mt-4">
            <Select value={hour} onValueChange={(val) => setHour(val)}>
              <SelectTrigger className="min-w-0 flex-1 sm:w-24 sm:flex-none bg-pink-50 border-pink-200 text-pink-700 px-2 sm:px-3">
                <SelectValue placeholder="Час" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                  <SelectItem
                    key={h}
                    value={`${h}`}
                    disabled={isWorkTime(answers.date, `${h}`)}
                  >
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={minute} onValueChange={(val) => setMinute(val)}>
              <SelectTrigger className="min-w-0 flex-1 sm:w-20 sm:flex-none bg-pink-50 border-pink-200 text-pink-700 px-2 sm:px-3">
                <SelectValue placeholder="Мин" />
              </SelectTrigger>
              <SelectContent>
                {["00", "15", "30", "45"].map((m) => (
                  <SelectItem
                    key={m}
                    value={m}
                    disabled={isWorkTime(answers.date, hour)}
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {isWorkTime(answers.date, hour) && (
            <div className="flex flex-col items-center justify-center">
              <p className="mt-3 text-sm font-semibold text-rose-500">
                В это время я на работе — выбери, пожалуйста, время вне
                промежутка 13:00–22:00
              </p>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  maxWidth: "200px",
                }}
                src="https://media1.tenor.com/m/mb1SfIYLEzEAAAAC/cat-praying-praying-cat.gif"
                alt="Котик молится"
                className="w-full max-w-xs sm:max-w-md mx-auto mb-4 rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        <Button
          onClick={() => setStep(step + 1)}
          disabled={
            !answers.date ||
            !answers.time ||
            isWorkTime(answers.date, hour)
          }
          className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-95 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          <Clock className="mr-2 h-5 w-5" /> Назначим свидание!{" "}
          <Heart className="ml-2 h-5 w-5" />
        </Button>
      </StepCard>
    </motion.div>,

    <motion.div key="step2" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={2} totalSteps={6}>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          Чем будем лакомиться, моя дорогая?
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          {[
            { name: "Пицца", icon: <Utensils className="w-6 h-6" /> },
            { name: "Паста", icon: <Utensils className="w-6 h-6" /> },
            { name: "Макароны", icon: <Utensils className="w-6 h-6" /> },
            { name: "Лазанья", icon: <Utensils className="w-6 h-6" /> },
            {
              name: "Курица в кисло-сладком соусе",
              icon: <Utensils className="w-6 h-6" />,
            },
            { name: "Лагман", icon: <Utensils className="w-6 h-6" /> },
            { name: "Плов", icon: <Utensils className="w-6 h-6" /> },
            { name: "Манты", icon: <Utensils className="w-6 h-6" /> },
            { name: "Шаурма", icon: <Utensils className="w-6 h-6" /> },
            { name: "Бургеры", icon: <Utensils className="w-6 h-6" /> },
            { name: "Суши", icon: <Utensils className="w-6 h-6" /> },
            { name: "Микс-рис", icon: <Utensils className="w-6 h-6" /> },
            { name: "Хачапури", icon: <Utensils className="w-6 h-6" /> },
            { name: "Ассорти закусок", icon: <Coffee className="w-6 h-6" /> },
          ].map(({ name, icon }) => (
            <SelectButton
              key={name}
              icon={icon}
              label={name}
              isSelected={answers.food.includes(name)}
              onClick={() => {
                const newFood = answers.food.includes(name)
                  ? answers.food.filter((f) => f !== name)
                  : [...answers.food, name];
                setAnswers({ ...answers, food: newFood });
              }}
            />
          ))}
        </div>
        <Button
          onClick={() => setStep(step + 1)}
          disabled={answers.food.length === 0}
          className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-95 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Выглядит вкусно! 🍽️
        </Button>
      </StepCard>
    </motion.div>,

    <motion.div key="step3" className="text-center" {...fadeInUp}>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
        Что посмотрим вместе?
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mb-6">
        {[
          "Айтматов",
          "Мончок",
          "Кот в шляпе",
          "Кул",
          "Тайке",
          "Психопатка",
          "Рамаяна: Восхождение легенды",
          "Плетёный муж",
          "Скрудж",
          "Инфлюенсер",
          "Дюна. Часть первая",
          "Шкатулка проклятия. Зло внутри",
          "Как поймать Деда Мороза",
          "Зверь",
          "Фьорд",
          "Кит: Во тьме глубин",
          "Остров забвения",
          "Что-то другое",
        ].map((movie) => (
          <motion.button
            key={movie}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-pink-600 hover:bg-pink-100 font-bold py-3 px-2 sm:py-4 sm:px-6 rounded-lg shadow-md transition-colors duration-300 text-xs sm:text-sm leading-tight break-words min-h-16"
            onClick={() => {
              if (movie === "Что-то другое") {
                setShowCustomMovie(true);
              } else {
                handleAnswer("movie", movie);
              }
            }}
          >
            <Film className="mx-auto mb-1 sm:mb-2 h-5 w-5 sm:h-6 sm:w-6" />
            {movie}
          </motion.button>
        ))}
      </div>
      {showCustomMovie && (
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            const movie = customMovie.trim();
            if (movie) handleAnswer("movie", movie);
          }}
        >
          <input
            type="text"
            autoFocus
            value={customMovie}
            onChange={(e) => setCustomMovie(e.target.value)}
            placeholder="Какой фильм ты хочешь посмотреть?"
            className="flex-1 min-w-0 rounded-full border border-pink-200 bg-white px-4 py-3 text-base text-pink-700 placeholder:text-pink-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <Button
            type="submit"
            disabled={!customMovie.trim()}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-95 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            Выбрать 🎬
          </Button>
        </motion.form>
      )}
    </motion.div>,

    <motion.div key="step4" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={4} totalSteps={6}>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
          Как сильно ты ждёшь нашего свидания?
        </h2>
        <div className="max-w-lg mx-auto mb-6 sm:mb-8 p-4 sm:p-8 bg-gradient-to-b from-white/80 to-pink-50/60 rounded-2xl shadow-lg border border-pink-100">
          <Slider
            defaultValue={[50]}
            max={100}
            step={25}
            onValueChange={(value) =>
              setAnswers({ ...answers, excitement: value[0] })
            }
          />
          <div className="flex justify-between gap-2 mt-4 sm:mt-6 text-[10px] sm:text-sm text-pink-600 font-semibold">
            <span className="text-left">😐 Жду не дождусь!</span>
            <span className="text-right">🤩 Я в полном восторге!</span>
          </div>
        </div>
        <motion.div
          className="text-xl sm:text-4xl font-playfair font-bold text-pink-600 mb-6 sm:mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Уровень предвкушения:{" "}
          <span className="text-rose-500">{answers.excitement}%</span>
        </motion.div>
        {answers.excitement === 0 && (
          <p className="text-lg text-rose-500 font-semibold mb-4">
            С таким настроем нет смысла идти
          </p>
        )}
        <Button
          onClick={() => {
            setStep(step + 1);
            setTimeout(triggerConfetti, 500);
          }}
          disabled={answers.excitement === 0}
          className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-rose-500 hover:brightness-95 text-white font-bold py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Решено, это официально! 💕
        </Button>
      </StepCard>
    </motion.div>,

    <motion.div key="step5" className="text-center" {...fadeInUp}>
      <StepCard stepNumber={6} totalSteps={6}>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
          Свидание назначено, любимая!
        </h2>
        <p className="text-base sm:text-lg text-rose-500 mb-3 font-poppins">
          Не могу дождаться нашей встречи:
        </p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-block max-w-full bg-gradient-to-r from-pink-100 to-rose-100 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-pink-200 mb-6 sm:mb-8"
        >
          <p className="text-xl sm:text-3xl font-playfair font-bold text-pink-700 break-words">
            {formatDate(answers.date)} в {answers.time}
          </p>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="https://media.tenor.com/yvUCU981VYoAAAAj/mochi-cat-goma.gif"
          alt="Радостный котик"
          className="w-full max-w-xs sm:max-w-md mx-auto mb-6 rounded-2xl shadow-2xl shadow-pink-300/30"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <Heart className="text-red-500 w-16 h-16 mx-auto mt-6 animate-pulse" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 space-y-3 text-lg text-pink-600 font-poppins"
        >
          <p className="text-base">
            Мы вкусно поедим:{" "}
            <span className="font-semibold">{answers.food.join(", ")}</span>.
          </p>
          <p className="text-base">
            Потом вместе посмотрим{" "}
            <span className="font-semibold italic">
              &laquo;{answers.movie}&raquo;
            </span>
            .
          </p>
          <p className="text-xl font-playfair font-bold mt-6">
            Твой уровень предвкушения:{" "}
            <span className="text-rose-600">{answers.excitement}/100</span>
          </p>
        </motion.div>
      </StepCard>
    </motion.div>,
  ];

  useEffect(() => {
    const saveAnswers = async () => {
      console.log("Saved answers:", answers);

      // Save to localStorage
      localStorage.setItem("dateProposalAnswers", JSON.stringify(answers));

      // Send to your email
      try {
        await fetch("/api/send-response", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        });
      } catch (error) {
        console.error("Failed to send response:", error);
      }
    };

    if (step === steps.length - 1) {
      saveAnswers();
    }
  }, [step, answers, steps.length]);

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 flex items-start sm:items-center justify-center px-3 py-4 sm:p-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Suspense fallback={null}>
        <HeartBackground />
      </Suspense>
      <div className="relative w-full max-w-3xl min-w-0">
        <FloatingOrbs />
        <ThemedCard>
          <Sparkles count={18} />
          <AnimatePresence mode="wait">{steps[step]}</AnimatePresence>
        </ThemedCard>
        <FairyFooter />
      </div>
    </div>
  );
}
