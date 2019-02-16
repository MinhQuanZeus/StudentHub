import React from 'react';
import  '../CalendarComponents/CalendarPopup.css'


let hideDIV = () => {
    console.log("close win!")
    const popupDIV = document.getElementById("popupDIV");
    popupDIV.className += " hideClass";
}

export const CalendarPopup = (props) => {
    return (
      <div className='popup_container hideClass' id="popupDIV">
        <div className='left_side'>
            <div className='show_hide_completed_items'>
                <input type='checkbox'></input>
                <p className='show_hide_label'>Show Complete Item</p>
                <p className='completed_items_label'>To Do List (3/5)</p>
            </div>
            <div className='section'>
                <p className='section_header'>General</p>
                <div className='checklist_item  checklist_sublist_active'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    
                    <p className='checklist_item_heading'>Create Dashboard Design</p>
                    <p className='item_status_percentage'>50%</p>
                </div>
                <div className='checklist_subitem'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    <p>Read Documentation</p>
                </div>
                <div className='checklist_subitem'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    <p>Create HTML</p>
                </div>
                <div className='checklist_subitem'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    <p>Create CSS & Jquery</p>
                </div>
                <div className='checklist_item'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    
                    <p className='checklist_item_heading'>Create Dashboard Design</p>
                    <p className='item_status_waiting'>Waiting</p>
                </div>
            </div>
            <div className='section' >
                <p className='section_header'>Admission</p>
                <div className='checklist_item'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    
                    <p className='checklist_item_heading'>Create Dashboard Design</p>
                    <p className='item_status_done'>Done</p>
                    <div className='checklist_subitems'>
                    </div>
                </div>
                <div className='checklist_item'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    
                    <p className='checklist_item_heading'>Create Dashboard Design</p>
                    <p className='item_status_done'>Done</p>
                    <div className='checklist_subitems'>
                    </div>
                </div>
                <div className='checklist_item'>
                    <input type='checkbox' className='subitem_checkbox'></input>
                    
                    <p className='checklist_item_heading'>Create Dashboard Design</p>
                    <p className='item_status_not_started'>Not Started</p>
                    <div className='checklist_subitems'>
                    </div>
                </div>
            </div>
            
        </div>
        <div className='right_side'>
            <div className='upper_grid'>
                <div className='grid_cell'>
                    <p>Category</p>
                    <span>General</span>
                </div>
                <div className='grid_cell'>
                    <p>Sub Category</p>
                    <span>Asia</span>
                </div>
                <div className='grid_cell full_width'>
                    <p>Description</p>
                    <span>Curabitur lobortis id lorem id bibenum. Ut id consectetur magna. Quisque.</span>
                </div>
            </div>
            <p className='contact_label'>CONTACT INFO</p>
            <div className='lower_grid'>
                <div className='grid_cell'>
                    <p>Phone</p>
                    <span>+123 456 789</span>
                </div>
                <div className='grid_cell'>
                    <p>Fax</p>
                    <span>+123 456 789</span>
                </div>
                <div className='grid_cell'>
                    <p>Email</p>
                    <span>cc@mail.com</span>
                </div>
                <div className='grid_cell'>
                    <p>Website</p>
                    <span>www.ccrect.com</span>
                </div>
            </div>
            <div className='btn_container'>
                <button className='checklist_btn'>Go To My Checklist</button>
            </div>
        </div>
        <button onClick={hideDIV} className='close-btn' id="close-btn">&#215;</button>
      </div>
    )
};
export default CalendarPopup;