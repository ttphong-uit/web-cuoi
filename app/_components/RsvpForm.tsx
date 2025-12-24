"use client";
import { useTranslation } from "@/lib/LanguageProvider";
import React, { useState } from "react";
import Button from "./Button";

export const RsvpForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    attendance: "yes",
    name: "",
    song: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      setError("required");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ attendance: "yes", name: "", song: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full py-10 px-4 flex justify-center items-center overflow-hidden bg-transparent">
      <div
        className="relative z-10 w-full max-w-lg bg-[#2a2a2a] rounded-3xl shadow-xl p-8 md:p-12 text-white"
        style={{
          boxShadow: "4px 4px 20px 0px rgba(43,43,43,0.36)",
        }}
      >
        <h2 className="text-5xl md:text-6xl text-center font-dancingScript mb-2 text-white">
          {t("rsvp.title")}
        </h2>
        <p className="text-center font-quickSand text-sm md:text-base mb-8 italic opacity-80">
          {t("rsvp.subtitle")}
        </p>

        <div className="space-y-6 font-quickSand">
          {/* Attendance */}
          <div>
            <p className="mb-3 text-lg font-medium">
              {t("rsvp.attendance.title")}
            </p>
            <div className="space-y-3">
              {[
                { value: "yes", label: t("rsvp.attendance.yes") },
                { value: "yesPartner", label: t("rsvp.attendance.yesPartner") },
                { value: "no", label: t("rsvp.attendance.no") },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-400 transition-colors group-hover:border-white">
                    <input
                      type="radio"
                      name="attendance"
                      value={option.value}
                      checked={formData.attendance === option.value}
                      onChange={(e) =>
                        setFormData({ ...formData, attendance: e.target.value })
                      }
                      className="peer appearance-none w-full h-full absolute inset-0 z-10 cursor-pointer"
                    />
                    {formData.attendance === option.value && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-base text-white/90">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Name Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 opacity-70">
                {t("rsvp.nameLabel")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (error) setError("");
                }}
                className={`w-full bg-transparent border-b ${
                  error ? "border-red-500" : "border-gray-500"
                } focus:border-white outline-none py-2 text-lg transition-colors placeholder-gray-500`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {t("widget.nameRequired") === "*"
                    ? "Vui lòng nhập tên của bạn"
                    : t("widget.nameRequired")}
                </p>
              )}
            </div>
          </div>

          {/* Song Request */}
          <div>
            <label className="block text-lg font-medium mb-1 mt-6">
              {t("rsvp.songRequest.title")}
            </label>
            <input
              type="text"
              value={formData.song}
              onChange={(e) =>
                setFormData({ ...formData, song: e.target.value })
              }
              placeholder={t("rsvp.songRequest.placeholder")}
              className="w-full bg-transparent border-b border-gray-500 focus:border-white outline-none py-2 text-lg transition-colors placeholder-gray-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-6 flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={status === "submitting" || status === "success"}
              color="black"
              variant="filled"
              shape="rounded"
              className="min-w-[250px]"
            >
              {status === "submitting"
                ? t("rsvp.submitting")
                : status === "success"
                ? t("rsvp.success")
                : t("rsvp.submit")}
            </Button>
          </div>
          {status === "error" && (
            <p className="text-red-500 text-center mt-2">{t("rsvp.error")}</p>
          )}
        </div>
      </div>
    </section>
  );
};
