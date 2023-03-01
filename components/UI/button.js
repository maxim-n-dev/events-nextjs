import Link from "next/link";
import styles from './button.module.css';

function Button(props){
  if(props.link) return <Link className={styles.btn} href={props.link}>{props.children}</Link>
  return <button type={props.type} className={styles.btn} onClick={props.onClick}>{props.children}</button>
}

export default Button;