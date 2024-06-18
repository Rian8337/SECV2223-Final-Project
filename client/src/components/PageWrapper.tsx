import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function PageWrapper(props: PropsWithChildren) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: "100%" }}
        >
            {props.children}
        </motion.section>
    );
}
