import { motion } from "framer-motion";
import "./VerticalFormError.css";

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
            {props.error}
        </motion.p>
    );
}
