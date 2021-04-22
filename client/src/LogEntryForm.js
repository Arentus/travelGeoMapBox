import React from "react";
import { useForm } from "react-hook-form";

const LogEntryForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entryForm">
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

      <button>Crear nueva</button>
    </form>
  );
};

export default LogEntryForm;
