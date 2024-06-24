import { motion } from "framer-motion";
import "./VerticalFormError.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function VerticalFormError(props: { error: string | null }) {
    if (!props.error) {
        return null;
    }

    return (
        <motion.p
            className="error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
        >
            <FontAwesomeIcon icon={faXmark} /> {props.error}
        </motion.p>
    );
}
