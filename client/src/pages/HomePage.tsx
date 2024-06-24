import PageWrapper from "../components/PageWrapper";

export default function HomePage() {
    return <PageWrapper>
        <div className="background grid gap-20 p-20">
            {/* box1 */}
            <div className="box1 grid ">
                <div className="intro-statement text-4xl font-normal"><strong>Introducing our special to-do list</strong></div>
                <br />
                <div>In today’s busy world, managing family schedules and tasks can be challenging. Whether it’s coordinating household chores, organizing events, or simply keeping track of everyone’s commitments, a specialized family to-do list web application offers a streamlined solution. This web app is designed to simplify task management specifically for family members, ensuring everyone stays organized and connected.</div>
            </div>
            {/* box2 */}
            <div className="box2 grid ">
                <div className="intro-statement text-4xl font-normal"><strong>Main Features</strong></div>
                <br />
                <div>✨ Family-based todo list</div>
                <div>✨ User account with family management support</div>
                <div>✨ Manage family members (up to 10 members) in todo list</div>
            </div>
            {/* box3 */}
            <div className="box3 grid ">
                <div className="intro-statement text-4xl font-normal"><strong>Big Thanks To</strong></div>
                <br />
                <br />
                <div className="box-person grid place-content-around gap-10">
                    <div className="person grid grid-cols-2 gap-5">
                        <img src="reza.png" alt="reza-pic" className="rounded-full" />
                        <div className="place-self-center grid gap-10">
                            <div className="name text-2xl font-semibold ">Reza Mouna Hendrian</div>
                            <a href="https://github.com/Rian8337"><img className="size-12 rounded-full" src="github.png" alt="githubpic" /></a>
                        </div>  
                    </div> 
                    <div className="person grid grid-cols-2 gap-5">
                        <div className="place-self-center grid gap-10">
                            <div className="name text-2xl font-semibold ">Ahmad Razan Alkhawarizmi</div>
                            <a href="https://github.com/Nano-v"><img className="size-12 rounded-full" src="github.png" alt="githubpic" /></a>
                        </div>  
                        <img src="razan.png" alt="razan-pic" className="rounded-full" />
                    </div> 
                    <div className="person grid grid-cols-2 gap-5">
                        <img src="mariam.png" alt="mariam-pic" className="rounded-full" />
                        <div className="place-self-center grid gap-10">
                            <div className="name text-2xl font-semibold ">Mariam Hanif</div>
                            <a href="https://github.com/mariamhanif310"><img className="size-12 rounded-full" src="github.png" alt="githubpic" /></a>
                        </div>  
                    </div> 
                </div>
                
            </div>

            

        
        </div>
    </PageWrapper>;
}
