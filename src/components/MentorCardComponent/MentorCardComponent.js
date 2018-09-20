import React from 'react';
import styles from './MentorCardComponent.css';


export const MentorCardComponent = (props) => {
    console.log('Props |==============>>', props.mentor);
    const {mentor} = props;
    let photo_url;
    let full_name;
    let phone;
    let primary_email;

    if (Object.keys(mentor).length > 0) {
        photo_url = 'images/avatar.jpeg';
        full_name = mentor.first_name + ' ' + mentor.last_name;
        phone = mentor.mobile_phone;
        primary_email = mentor.primary_email;
    }
    return (
        
            <div className={styles["contact-box"]}>
                <div className={styles["content"]}>
                    <div><img
                        src={photo_url}
                        className={styles["avatar"]} alt=""/>
                    </div>
                        <p className={styles["contact-name"]}>{full_name}</p>
                        <p className={styles["contact-position"]}>Freshman Mentor</p>
                        <br/>
                        <button className={styles["chat-button"]}><i
                            className="far fa-comment"></i> &nbsp;&nbsp;Let's Chat
                        </button>
                </div>
                <div className={styles["footer"]}>
                    <p className={styles["email"]}><i className="far fa-envelope"></i> &nbsp;&nbsp;{primary_email}</p>
                    <p className={styles["phone"]}><i className="fas fa-phone"
                    style={{transform: 'rotate(90deg)'}}></i>
                    &nbsp;&nbsp;(000){phone}</p>
                </div>
            </div>
    )
};


// export default class MentorCardComponent extends Component {
//
//
//     render() {
//         const {mentor} = this.props;
//         let photo_url;
//         let full_name;
//         let phone;
//         let primary_email;
//
//         if (Object.keys(mentor).length > 0) {
//             photo_url = 'images/avatar.jpeg';
//             full_name = mentor.first_name.data + ' ' + mentor.last_name.data;
//             phone = mentor.mobile_phone.data;
//             primary_email = mentor.primary_email.data;
//         }
//         return (
//             <div className="col-3 col-4-sm">
//                 <div className="contact-box">
//                     <div className="content">
//                         <div><img
//                             src={photo_url}
//                             className="avatar" alt=""/>
//                         </div>
//                         <div className="text-center">
//                             <p className="contact-name">{full_name}</p>
//                             <p className="contact-position">Freshman Mentor</p>
//                             <br/>
//                             <button className="btn btn-sm btn-outline btn-round"><i
//                                 className="far fa-comment"></i> &nbsp;&nbsp;Let's Chat
//                             </button>
//                         </div>
//                     </div>
//                     <div className="footer">
//                         <div className="text-center info">
//                             <p><i className="far fa-envelope"></i> &nbsp;&nbsp;{primary_email}</p>
//                             <p><i className="fas fa-phone"
//                                   style={{transform: 'rotate(90deg)'}}></i>
//                                 &nbsp;&nbsp;(000){phone}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// };
//
// MentorCardComponent.propTypes = {
//     mentor: PropTypes.object
// };
