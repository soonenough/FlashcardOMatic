import Header from "./Header";
import BreadCrumbNav from "./BreadCrumbNav";
import DeckForm from "../Decks/DeckForm";

function CreateDeck() {
    const breadcrumbPaths = [
        { label: 'Home', path: '/' },
        { label: 'Create Deck' },
    ];

    return (
        <>
            <Header />
            <div className="container">
                <BreadCrumbNav paths={breadcrumbPaths} />
                <h1>Create Deck</h1>
                <DeckForm />
            </div>
        </>
    );
}


export default CreateDeck;