'use client';

import { Order } from "@/interfaces/Order";
import { Resource } from "@/interfaces/Resource";
import { useState } from "react";

export default function OrderForm() {

  const [name, setName] = useState("New order");
  const [desc, setDesc] = useState("New order description");

  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  // const date = new Date();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <form className="order_form" onSubmit={(e) => submit(e)}>
      <div className="form_segment">
        <label htmlFor="name_input">Order name:</label>
        <input
          type="text"
          name="name_input"
          id="name_input"
          className="name_input"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
        />
      </div>
      <div className="form_segment">
        <label htmlFor="desc_input">Description:</label>
        <textarea
          name="desc_input"
          id="desc_input"
          className="desc_input"
          value={desc}
          onChange={(e) => {setDesc(e.target.value)}}
        />
      </div> <hr />
      <div className="form_segment">
        <label htmlFor="res_input">Assign a resource:</label>
        <select name="res_input" id="res_input" className="ml-2">
          <optgroup>
            <option>resource1</option>
            <option>resource2</option>
            <option>resource3</option>
            <option>resource4</option>
            <option>resource5</option>
          </optgroup>
        </select>
      </div>
      <div className="form_segment">
        <label htmlFor="start_input">Start date/time:</label>
        <div>
          <input
            type="date"
            name="start_date_input"
            id="start_date_input"
            value={start_date}
            onChange={(e) =>{
              console.log(e.target.value);
              setStartDate(e.target.value);
            }}
          />
          <input
            type="time"
            name="start_time_input"
            id="start_time_input"
            value={start_time}
            onChange={(e) =>{
              console.log(e.target.value);
              setStartTime(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form_segment">
        <label htmlFor="end_input">End date/time:</label>
        <div>
          <input
            type="date"
            name="end_date_input"
            id="end_date_input"
            value={end_date}
            onChange={(e) =>{
              console.log(e.target.value);
              setEndDate(e.target.value);
            }}
          />
          <input
            type="time"
            name="end_time_input"
            id="end_time_input"
            value={end_time}
            onChange={(e) =>{
              console.log(e.target.value);
              setEndTime(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="form_submit">
        <input type="submit" value="Create order"/>
      </div>
    </form>
  );
}