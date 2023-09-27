import { useState, useEffect } from "react";
import chaptersService from "../services/chapters.service";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// .then(response => {
//      toast.success("The chapter has been created successfully!"); })
// .catch(error => {
//      toast.error("An error occurred while creating the chapter:")
// });


function CreateChapter() {
    const { bookId, chapterId } = useParams();
    // Automatically navigate to other route
    const navigate = useNavigate();
    // Determine if chapter has been saved once before
    const isNewChapter = !chapterId;

    const [formData, setFormData] = useState({
        // Initial state of form
        chapterNumber: "",
        title: "",
        outline: "",
        text: ""
    });

    // If chapterId exists, ...

    // Updates the formData state when the value of the input changes
    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        chaptersService.createChapter(bookId, formData)
            // Navigate to page of chapter that was created
            .then(response => {
                navigate(`books/${bookId}/chapters/${response.data._id}`);
            })
            .catch(error => {
                console.error("Error creating chapter:", error);
            });
        };

    // If cancel is clicked, navigate to the chapter's book
    const handleCancel = () => {
        navigate(`/books/${bookId}`);
    };

    // If delete is clicked, delete chapter
    const handleDelete = () => {
        chaptersService.deleteChapter(bookId, chapterId);
    };

    return (
        <div>
            <h2> {isNewChapter ?
                "Create new chapter" :
                "Edit chapter"}
            </h2>
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <textarea
                    name="outline"
                    value={formData.outline}
                    onChange={handleChange}
                    placeholder="Write your outline..."
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write your story..."
                />
                <button type="submit">{ isNewChapter ? "Save" : "Save changes"}</button>
                <button type="button" onClick={handleCancel}>{ isNewChapter ? "Cancel and discard" : "Cancel"}</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )

}

  
  export default CreateChapter;