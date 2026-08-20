"use server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  "name",
  "email",
  "dial",
  "phone",
  "date",
  "slot",
  "destination",
  "travellers",
  "window",
  "budget",
  "notes",
  "consent",
];

/** Local YYYY-MM-DD, one day back so a client in any timezone isn't rejected. */
function earliestDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export async function submitEnquiry(_prevState, formData) {
  const values = Object.fromEntries(
    FIELDS.map((f) => [f, (formData.get(f) ?? "").toString().trim()]),
  );

  // Hidden field no human sees; a filled one means a bot. Fail silently.
  if ((formData.get("company") ?? "").toString()) {
    return { ok: true, name: "", date: values.date, slot: values.slot };
  }

  const errors = {};

  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "A valid email is required.";

  const digits = values.phone.replace(/\D/g, "");
  // if (digits.length < 7) errors.phone = "A reachable number is required.";

  if (!values.date) {
    errors.date = "Choose a day that suits you.";
  } else if (Number.isNaN(Date.parse(values.date))) {
    errors.date = "That date doesn't look right.";
  } else if (values.date < earliestDate()) {
    errors.date = "Please choose a date in the future.";
  }

  if (!values.slot) errors.slot = "Choose a window for the call.";
  if (values.notes.length > 1200) errors.notes = "Please keep this under 1200 characters.";
  if (!values.consent) errors.consent = "Please agree before sending.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values };
  }

  // TODO: forward to an inbox or CRM (Resend, Postmark, HubSpot…). Until then the
  // enquiry only reaches the server log and is not stored anywhere.
  console.log("[enquiry]", values);

  return { ok: true, name: values.name, date: values.date, slot: values.slot };
}
