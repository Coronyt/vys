'use client';

import { DateTime } from "@/interfaces/DateTime";
import { Order } from "@/interfaces/Order";
import { useOrderContext } from "@/context/order_context";
import { useResContext } from "@/context/res_context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderForm() {

  const router = useRouter()

  const { orders, setOrders } = useOrderContext();
  const { resources, setResources } = useResContext();

  const [name, setName] = useState("New order");
  const [desc, setDesc] = useState("New order description");

  const [res, setRes] = useState(resources[0].id); // Default to first resource in master list

  const [start_date, setStartDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_date, setEndDate] = useState("");
  const [end_time, setEndTime] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Loading start date/time information into DateTime object
    const start_date_arr = start_date.split("-"); // [0] = year, [1] = month, [2] = day
    const start_time_arr = start_time.split(":"); // [0] = hour, [1] = minute
    const start_date_time: DateTime = {
      month: Number(start_date_arr[1]),
      day: Number(start_date_arr[2]),
      year: Number(start_date_arr[0]),
      hour: Number(start_time_arr[0]),
      minute: Number(start_time_arr[1])
    } // Loading end date/time information into DateTime object
    const end_date_arr = end_date.split("-"); // [0] = year, [1] = month, [2] = day
    const end_time_arr = end_time.split(":"); // [0] = hour, [1] = minute
    const end_date_time: DateTime = {
      month: Number(end_date_arr[1]),
      day: Number(end_date_arr[2]),
      year: Number(end_date_arr[0]),
      hour: Number(end_time_arr[0]),
      minute: Number(end_time_arr[1])
    } // Loading all order information into Order object
    const new_order: Order = {
      name: name,
      desc: desc,
      res: res,
      start: start_date_time,
      end: end_date_time
    }
    // Get current orders
    const curr = orders;
    // Append to array
    curr.push(new_order);
    // Hand to context
      // Eventually the orders will be stored locally through a JSON server
      // In the final iteration, the orders will be organized into a SQL database
    setOrders(curr);
    // Redirect to table
    router.push("/inspect");
  }

  return (
    <form className="order_form" onSubmit={(e) => submit(e)}>
      <h2 className="page_title">Create a new order</h2>
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
        <select
          name="res_input"
          id="res_input"
          className="ml-2"
          onChange={(e) => {setRes(e.target.value)}}
        >
          <optgroup>
            {resources.map((element, index) => {return <option key={index} value={element.id}>{element.name}</option>})}
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