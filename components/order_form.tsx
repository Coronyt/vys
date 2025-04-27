export default function OrderForm() {
  return (
    <form className="order_form">
      <div className="form_segment">
        <label htmlFor="name_input">Order name:</label>
        <input type="text" name="name_input" id="name_input" className="name_input"/>
      </div>
      <div className="form_segment">
        <label htmlFor="desc_input">Description:</label>
        <textarea name="desc_input" id="desc_input" className="desc_input"/>
      </div>
      <div className="form_segment">
        <label htmlFor="res_input">Assign resource:</label>
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
        <label htmlFor="start_input">Start date:</label>
        <input type="date" name="start_input" id="start_input"/>
      </div>
      <div className="form_segment">
        <label htmlFor="end_input">End date:</label>
        <input type="date" name="end_input" id="end_input"/>
      </div>
      <div className="form_submit">
        <input type="submit" value="Create order"/>
      </div>
    </form>
  );
}