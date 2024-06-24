import PageWrapper from "../components/PageWrapper";
import HomePageContainer from "../components/home/HomePageContainer";
import HomePagePerson from "../components/home/HomePagePerson";
import HomePageSection from "../components/home/HomePageSection";

export default function HomePage() {
    return (
        <PageWrapper>
            <HomePageContainer>
                <HomePageSection title="Introducing our special to-do list">
                    In today&apos;s busy world, managing family schedules and
                    tasks can be challenging. Whether it&apos;s coordinating
                    household chores, organizing events, or simply keeping track
                    of everyone&apos;s commitments, a specialized family to-do
                    list web application offers a streamlined solution. This web
                    app is designed to simplify task management specifically for
                    family members, ensuring everyone stays organized and
                    connected.
                </HomePageSection>

                <HomePageSection title="Main Features">
                    <p>✨ Family-based todo list</p>
                    <p>✨ User account with family management support</p>
                    <p>✨ Manage up to 10 family members in todo list</p>
                </HomePageSection>

                <HomePageSection title="Big Thanks To">
                    <br />

                    <div className="grid place-content-around gap-10">
                        <HomePagePerson
                            imageSrc="reza.png"
                            imageAlt="reza-pic"
                            name="Reza Mouna Hendrian"
                            githubUsername="Rian8337"
                        />

                        <HomePagePerson
                            imageSrc="razan.png"
                            imageAlt="razan-pic"
                            name="Ahmad Razan Alkhawarizmi"
                            githubUsername="Nano-v"
                            imageInRight
                        />

                        <HomePagePerson
                            imageSrc="mariam.png"
                            imageAlt="mariam-pic"
                            name="Mariam Hanif"
                            githubUsername="marianhanif310"
                        />
                    </div>
                </HomePageSection>
            </HomePageContainer>
        </PageWrapper>
    );
}
