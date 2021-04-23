import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createLogEntry } from "./API";

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(data);
      onClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
      {error ? <h3>{error}</h3> : null}
      <label htmlFor="title">Titulo</label>
      <input required {...register("title")} />

      <label htmlFor="comments">Comentarios</label>
      <textarea {...register("comments")} rows={3} />

      <label htmlFor="description">Description</label>
      <textarea {...register("description")} rows={3} />

      <label htmlFor="image">Image</label>
      <input {...register("image")} />

      <label htmlFor="visitDate">Fecha de Visita</label>
      <input {...register("visitDate")} required type="date" />

      <button disabled={loading}>
        {loading ? "Cargando..." : "Crear nueva"}
      </button>
    </form>
  );
};

export default LogEntryForm;
