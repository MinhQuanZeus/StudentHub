import React from 'react';
import styles from './ProgramInfoComponent.css'

export const ProgramInfoComponent = (props) => {
    return (
        <div className={styles["programInfoContainer"]}>
            <div className={styles["title"]}>
            <h3>PROGRAM ACADEMIC INFO</h3>
            </div>
            <div className={styles["grid"]}>
                <div className={styles["box"]}>
                    <p className={styles["label"]}>Program Name</p>
                    <p className={styles["value"]}>Computer Science</p>
                </div>
                <div className={styles["box"]}>
                    <p className={styles["label"]}>Program Type</p>
                    <p className={styles["value"]}>Bachelor's Degree</p>
                </div>
                <div className={styles["box"]}>
                    <p className={styles["label"]}>Program Level</p>
                    <p className={styles["value"]}>Bachelor Degree</p>
                </div>
                <div className={styles["box"]}>
                    <p className={styles["label"]}>Program Length</p>
                    <p className={styles["value"]}>4 Years</p>
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
                    <p className={styles["value"]}>Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.</p>
                </div>
            
        </div>
    )
}