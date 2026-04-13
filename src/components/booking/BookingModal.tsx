import { useState, useEffect } from "react";
import { openWhatsApp } from "../../lib/whatsapp";
import {
  openGoogleCalendar,
  createCalendarEvent,
} from "../../lib/google-calendar";

interface BookingModalProps {
  whatsappNumber: string;
  googleCalendarEnabled?: boolean;
  clinicName?: string;
  clinicAddress?: string;
}

const SERVICES = [
  "Oclusodontia",
  "Estética Dental",
  "Ortodoncia",
  "Prótesis Dental",
  "Campaña Preventiva",
  "Plan Nutricional Dental",
  "Revisión General",
  "Consulta Gratuita",
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

type BookingMethod = "whatsapp" | "calendar";

export default function BookingModal({
  whatsappNumber,
  googleCalendarEnabled = false,
  clinicName = "Dra. Agatha James",
  clinicAddress = "",
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [method, setMethod] = useState<BookingMethod>("whatsapp");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", date: "", time: "", notes: "",
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-booking", handler);
    return () => window.removeEventListener("open-booking", handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleMethodSelect(m: BookingMethod) { setMethod(m); setStep(2); }
  function canProceedStep2() { return !!(form.name && form.phone && form.service); }
  function canProceedStep3() { return !!(form.date && form.time); }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitResult(null);

    if (method === "whatsapp") {
      openWhatsApp({ number: whatsappNumber, name: form.name, service: form.service, date: form.date, time: form.time });
      setSubmitResult({ success: true, message: "Se abrió WhatsApp con tu mensaje. ¡Te esperamos!" });
      setIsSubmitting(false);
      return;
    }

    const startDateTime = `${form.date}T${form.time}:00`;

    if (googleCalendarEnabled) {
      const result = await createCalendarEvent({
        title: `Cita Dental - ${form.name}`,
        description: [`Paciente: ${form.name}`, `Teléfono: ${form.phone}`, form.email ? `Email: ${form.email}` : "", `Servicio: ${form.service}`, form.notes ? `Notas: ${form.notes}` : ""].filter(Boolean).join("\n"),
        startDateTime, durationMinutes: 60, location: clinicAddress, patientName: form.name, patientPhone: form.phone,
      });
      setSubmitResult(result.success
        ? { success: true, message: "¡Cita agendada exitosamente! Recibirás una confirmación por correo." }
        : { success: false, message: `Error al agendar: ${result.error}. Intenta por WhatsApp.` });
    } else {
      openGoogleCalendar({
        title: `Cita con ${clinicName} - ${form.service}`,
        description: [`Servicio: ${form.service}`, form.notes ? `Notas: ${form.notes}` : "", `Confirmar llamando al consultorio.`].filter(Boolean).join("\n"),
        startDateTime, durationMinutes: 60, location: clinicAddress,
      });
      setSubmitResult({ success: true, message: "Se abrió Google Calendar. Agrega el evento y te confirmaremos." });
    }
    setIsSubmitting(false);
  }

  function handleClose() {
    setIsOpen(false); setStep(1); setSubmitResult(null);
    setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", notes: "" });
  }

  const inputClass = "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-salmon focus:ring-2 focus:ring-salmon/20";

  return (
    <>
      {/* Floating WhatsApp button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110 active:scale-95 md:h-16 md:w-16"
        aria-label="Agendar cita"
      >
        <svg className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative z-10 mx-4 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl text-charcoal">Agendar Cita</h2>
                <p className="mt-1 text-sm text-muted">
                  {step === 1 && "Elige cómo prefieres agendar"}
                  {step === 2 && "Cuéntanos sobre ti"}
                  {step === 3 && "Elige fecha y hora"}
                </p>
              </div>
              <button onClick={handleClose} className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-cream" aria-label="Cerrar">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {submitResult && (
              <div className={`mb-4 rounded-2xl p-4 text-sm ${submitResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                {submitResult.message}
                {submitResult.success && <button onClick={handleClose} className="mt-2 block font-medium text-salmon underline">Cerrar</button>}
              </div>
            )}

            {!submitResult && (
              <>
                {step === 1 && (
                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleMethodSelect("whatsapp")} className="flex items-center gap-4 rounded-2xl border-2 border-transparent bg-cream p-4 text-left transition-all hover:border-[#25D366] hover:bg-[#25D366]/5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      </div>
                      <div><p className="font-semibold text-charcoal">WhatsApp</p><p className="text-sm text-muted">Mensaje directo, respuesta inmediata</p></div>
                    </button>
                    <button onClick={() => handleMethodSelect("calendar")} className="flex items-center gap-4 rounded-2xl border-2 border-transparent bg-cream p-4 text-left transition-all hover:border-salmon hover:bg-salmon-lighter">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-salmon text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      </div>
                      <div><p className="font-semibold text-charcoal">Google Calendar</p><p className="text-sm text-muted">{googleCalendarEnabled ? "Agenda directamente en nuestro calendario" : "Agrega un recordatorio a tu calendario"}</p></div>
                    </button>
                    <div className="mt-2 text-center">
                      <button onClick={() => { openWhatsApp({ number: whatsappNumber, customMessage: "Hola, me gustaría agendar una cita con la Dra. Agatha James. ¿Podrían ayudarme?" }); }} className="text-sm text-salmon-dark underline hover:text-charcoal">O envía un WhatsApp rápido sin formulario</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="flex flex-col gap-4">
                    <div><label htmlFor="b-name" className="mb-1 block text-sm font-medium text-charcoal">Nombre completo *</label><input id="b-name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Tu nombre" className={inputClass} /></div>
                    <div><label htmlFor="b-phone" className="mb-1 block text-sm font-medium text-charcoal">Teléfono *</label><input id="b-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+52 55 1234 5678" className={inputClass} /></div>
                    {method === "calendar" && <div><label htmlFor="b-email" className="mb-1 block text-sm font-medium text-charcoal">Correo electrónico</label><input id="b-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" className={inputClass} /></div>}
                    <div><label htmlFor="b-service" className="mb-1 block text-sm font-medium text-charcoal">Servicio *</label><select id="b-service" name="service" required value={form.service} onChange={handleChange} className={inputClass}><option value="">Selecciona un servicio</option>{SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep(1)} className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium text-muted hover:bg-cream">Atrás</button>
                      <button onClick={() => setStep(3)} disabled={!canProceedStep2()} className="flex-1 rounded-2xl bg-salmon px-5 py-3 text-sm font-semibold text-white hover:bg-salmon-dark disabled:cursor-not-allowed disabled:opacity-50">Continuar</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex flex-col gap-4">
                    <div><label htmlFor="b-date" className="mb-1 block text-sm font-medium text-charcoal">Fecha preferida *</label><input id="b-date" name="date" type="date" required min={minDate} value={form.date} onChange={handleChange} className={inputClass} /></div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-charcoal">Hora preferida *</label>
                      <div className="grid grid-cols-4 gap-2">{TIME_SLOTS.map((t) => <button key={t} type="button" onClick={() => setForm((p) => ({ ...p, time: t }))} className={`rounded-xl border px-3 py-2 text-sm transition-all ${form.time === t ? "border-salmon bg-salmon font-medium text-white" : "border-gray-200 text-charcoal hover:border-salmon hover:bg-salmon-lighter"}`}>{t}</button>)}</div>
                    </div>
                    <div><label htmlFor="b-notes" className="mb-1 block text-sm font-medium text-charcoal">Notas adicionales</label><textarea id="b-notes" name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="¿Algo que debamos saber?" className={`${inputClass} resize-none`} /></div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => setStep(2)} className="rounded-2xl border border-gray-200 px-5 py-3 text-sm font-medium text-muted hover:bg-cream">Atrás</button>
                      <button onClick={handleSubmit} disabled={!canProceedStep3() || isSubmitting} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-salmon px-5 py-3 text-sm font-semibold text-white hover:bg-salmon-dark disabled:cursor-not-allowed disabled:opacity-50">
                        {isSubmitting ? <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : method === "whatsapp" ? "Enviar por WhatsApp" : "Agendar en Calendario"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
