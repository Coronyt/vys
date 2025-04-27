export default function OrderForm() {
  return (
    <form className="order_form">
      <h2>order_form</h2>
      <div className="form_segment">
        <label htmlFor="name_input">Order name:</label>
        <input type="text" name="name_input" id="name_input" className="border-1"/>
      </div>
      <div className="form_segment">
        <label htmlFor="desc_input">Order description:</label>
        <textarea name="desc_input" id="desc_input" className="border-1"/>
      </div>
      <div className="form_segment">
        <label htmlFor="res_input">Assign a resource:</label>
        <select name="res_input" id="res_input">
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
        <label htmlFor="start_input">Order start date:</label>
        <input type="date" name="start_input" id="start_input"/>
      </div>
      <div className="form_segment">
        <label htmlFor="end_input">Order end date:</label>
        <input type="date" name="end_input" id="end_input"/>
      </div>
    </form>
  );
}