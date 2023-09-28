import { useState, useEffect } from "react";
import chaptersService from "../services/chapters.service";
import booksService from "../services/books.service";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


function CreateChapter() {
    const { bookId, chapterId } = useParams();
    // Automatically navigate to other route
    const navigate = useNavigate();
    // Determine if chapter has been saved once before
    const isNewChapter = !chapterId;


    const initialState = {
        chapterNumber: "",
        title: "Chapter title",
        outline: "",
        text: ""
    };


    const [formData, setFormData] = useState(initialState);
    const [bookTitle, setBookTitle] = useState("");


    useEffect(() => {
        // Get the book's title
        booksService.getBook(bookId)
                .then(response => {
                    setBookTitle(response.data.title);
                })
                .catch(error => {
                    console.error("Error fetching chapter:", error);
                })
        // Updates chapter's formData if its chapterId value changes
        if (chapterId) {
            chaptersService.getChapter(bookId, chapterId)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching chapter:", error);
                });
        }
    }, [bookId, chapterId]);


    // Updates the formData state when the value of the input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isNewChapter) {
            chaptersService.createChapter(bookId, formData)
                // Navigate to page of chapter that was created
                .then(response => {
                    navigate(`/books/${bookId}/chapters/${response.data._id}`);
                    toast.success("The chapter has been created successfully!");
                })
                .catch(error => {
                    console.error("Error creating chapter:", error);
                    toast.error("An error occurred while creating the chapter.");
                });
        } else {
            chaptersService.updateChapter(bookId, chapterId, formData)
                .then(response => {
                    navigate(`/books/${bookId}/chapters/${response.data._id}`);
                    toast.success("The chapter has been updated successfully!");
                })
                .catch(error => {
                    console.error("Error updating chapter:", error);
                    toast.error("An error occurred while updating the chapter.");
                });
        }
    };


    // If cancel is clicked, navigate to the chapter's book
    const handleCancel = () => {
        navigate(`/books/${bookId}`);
    };


    // Delete chapter & then navigate to chapter's book
    const handleDelete = () => {
        chaptersService.deleteChapter(bookId, chapterId)
            .then(() => {
                navigate(`/books/${bookId}`);
                toast.success("The chapter has been deleted successfully!");
            })
            .catch(error => {
                console.error("Error deleting chapter:", error);
                toast.error("An error occurred while deleting the chapter.");
            });
    };


    return (
        <div>

            {/* Title section */}
            <div style={{ backgroundColor: 'black', height: '120px' }}>
                {isNewChapter ? (

                    <div>
                        <Link to="/">Books</Link> → <Link to={`/books/${bookId}`}>{bookTitle}</Link> → My chapter
                    </div>
                ) : (
                    <div>
                        <Link to="/">Books</Link> → <Link to={`/books/${bookId}`}>{bookTitle}</Link> → <span>Chapter {formData.chapterNumber}</span>
                    </div>
                )}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Chapter title"
                /><br />
            </div>

            {/* Button nav bar */}
            <div>
            {!isNewChapter && <button type="button" onClick={handleDelete}>Delete</button>}
                <button type="button" onClick={handleCancel}>{isNewChapter ? "Cancel and discard" : "Cancel and exit"}</button>
                <button type="submit" form="chapterForm">
                    {isNewChapter ? "Save" : "Save changes"}
                </button>
            </div><br/>

            {/* Rest of the fields */}
            <form id="chapterForm" onSubmit={handleSubmit}>
                <textarea
                    name="outline"
                    value={formData.outline}
                    onChange={handleChange}
                    placeholder="Write your outline..."
                /><br/>
                <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Write your story..."
                />
            </form>

        </div>
    )

}

  
  export default CreateChapter;