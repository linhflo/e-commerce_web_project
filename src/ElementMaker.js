import React from "react";

// Creat an ElementMaker component
function ElementMaker(props) {
  return (
    // Render a <span> element
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
        //  If props.showInputEle's value is truthy, render 
        //  an <input> element as <span>'s inner content
          <input 
            type="text" // Specify the <input> element as a single-line text field
            value={props.value} // Use the props parameter's value as the <input> element's value
            onChange={props.handleChange} // Trigger the handleChange function whenever <input>'s value changes
            onBlur={props.handleBlur} // Invoke handleBlur whenever users click out of the <input> field
            autoFocus // Focus automatically on the <input> element when the page loads
          />
        ) : (
        //  However, if props.showInputEle's value is falsy, use a 
        //  second <span> element as the first <span>'s inner content
          <span 
            onDoubleClick={props.handleDoubleClick} // Invoke handleDoubleClick() whenever users doubleclick the <span> element
            style={{ 
              display: "inline-block", 
              height: "25px", 
              minWidth: "300px", 
            }} // Style <span> as an inline-block element of 25px height and a minimum width of 300px
          >
            {props.value} {/* Use the props parameter's value as the <span> element's content */}
          </span>
        )
      }
    </span>
  );
}

export default ElementMaker;