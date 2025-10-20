import { supabaseClient } from "@/supabase/supabase-client";

const API_BASE_URL = "http://localhost:3000/api";

export const sendNotification = async (
  clientPhone: string,
  washingId: number
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_phone: clientPhone }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: data.error || `Error ${response.status}: ${response.statusText}`,
      };
    }

    if (!data.success) {
      return {
        ok: false,
        message: data.error || "Error al enviar la notificación",
      };
    }

    // Actualizar el estado en la base de datos si el mensaje fue enviado
    if (data.success) {
      const { error } = await supabaseClient
        .from("washed")
        .update({
          notified_client: true,
        })
        .eq("id", washingId);

      if (error) {
        console.error("Error al actualizar el estado:", error);
        return {
          ok: false,
          message: "Notificación enviada pero error al actualizar el estado",
        };
      }
    }

    // Determinar el mensaje basado en el status
    const statusMessages = {
      delivered: "Notificación enviada y entregada correctamente",
      sent: "Notificación enviada correctamente",
      queued: "Notificación enviada correctamente",
      accepted: "Notificación enviada correctamente",
      default: "Notificación enviada correctamente",
    };

    const message = statusMessages[data.status as keyof typeof statusMessages] || statusMessages.default;

    return {
      ok: true,
      message,
      status: data.status,
      sid: data.sid,
    };
  } catch (error) {
    console.error("Error al enviar la notificación:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error de conexión",
    };
  }
};
