interface Props {
    readonly imageSrc: string;
    readonly imageAlt: string;
    readonly name: string;
    readonly githubUsername: string;
    readonly imageInRight?: boolean;
}

export default function HomePagePerson(props: Props) {
    const image = (
        <img
            src={props.imageSrc}
            alt={props.imageAlt}
            className="rounded-full"
        />
    );

    const info = (
        <div className="place-self-center grid gap-10">
            <div className="text-2xl font-semibold">{props.name}</div>

            <a href={`https://github.com/${props.githubUsername}`}>
                <img
                    className="size-12 rounded-full"
                    src="github.png"
                    alt="githubpic"
                />
            </a>
        </div>
    );

    return (
        <div className="grid grid-cols-2 gap-5">
            {props.imageInRight ? info : image}
            {props.imageInRight ? image : info}
        </div>
    );
}
