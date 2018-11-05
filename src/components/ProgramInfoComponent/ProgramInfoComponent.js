import React from 'react';
import styles from './ProgramInfoComponent.css'

export const ProgramInfoComponent = (props) => {

    if (props.academic_program !== undefined&&props.academic_program !== null) {
        let {program_length, program_name, program_overview, program_type} = props.academic_program[0];
        return (
            <div className={styles["programInfoContainer"]}>
                <div className={styles["title"]}>
                    <h3>PROGRAM ACADEMIC INFO</h3>
                </div>
                <div className={styles["grid"]}>
                    <div className={styles["box"]}>
                        <p className={styles["label"]}>Program Name</p>
                        <p className={styles["value"]}>{program_name}</p>
                    </div>
                    <div className={styles["box"]}>
                        <p className={styles["label"]}>Program Type</p>
                        <p className={styles["value"]}>{program_type}</p>
                    </div>
                    <div className={styles["box"]}>
                        <p className={styles["label"]}>Program Level</p>
                        <p className={styles["value"]}>Bachelor Degree</p>
                    </div>
                    <div className={styles["box"]}>
                        <p className={styles["label"]}>Program Length</p>
                        <p className={styles["value"]}>{program_length}</p>
                    </div>
                    <div className={styles["box"]}>
                        <p className={styles["label"]}>Degree</p>
                        <p className={styles["value"]}>BS ( Bachelor of Science )</p>
                    </div>
                    <div className={styles["box"]}>
                        <p className={styles["label"]}>Program Link</p>
                        <p className={styles["value"]}>Science Technology</p>
                    </div>
                </div>
                <div className={styles["box"]}>
                    <p className={styles["label"]}>Full Description</p>
                    <p className={styles["value"]}>{program_overview}</p>
                </div>

            </div>
        )
    } else {
        return (<div></div>)
    }
}