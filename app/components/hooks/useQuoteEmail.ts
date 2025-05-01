import { useState } from "react"
import { toast } from "react-toastify"
import sendQuoteEmail from "../../helpers/sendQuoteEmail"
import logToSharePointOrBackend from "../../helpers/logToSharePointOrBackend"

export const useQuoteEmail = ({ form, totals }: any) => {
  const [sending, setSending] = useState(false)

  const send = async () => {
    const to = form.requestorEmail || form.requestor
    const subject = "Quote for ZIP"; 
    const html = form.generateQuoteHtml(form, totals)

    if (!to || !subject || !html) {
      toast.error("? Missing email details")
      return
    }

    setSending(true)
    try {
      await sendQuoteEmail({ to, subject, html })
      toast.success("? Email sent!")

      await logToSharePointOrBackend({
        type: "EMAIL_SENT",
        quoteId: form.quoteId || "N/A",
        recipient: to,
        user: form.userId || "currentUser",
        timestamp: new Date().toISOString()
      })
    } catch (err) {
      toast.error("? Send failed.")
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  return { send, sending }
}
