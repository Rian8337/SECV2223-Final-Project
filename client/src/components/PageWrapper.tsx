import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import "./PageWrapper.css";

export default function PageWrapper(props: PropsWithChildren) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="page-container"
        >
            {props.children}
        </motion.section>
    );
}
