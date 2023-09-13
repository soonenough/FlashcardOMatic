import CardForm from "../Cards/CardForm";
import Header from "./Header";
import BreadCrumbNav from "./BreadCrumbNav";

function EditCard(){
    return(
        <>
        <Header />
        <div className="container">
            <CardForm />
        </div>
        </>
    )
}

export default EditCard;