import { useState } from "react";
import chaptersService from "../services/chapters.service";
import { useParams, useNavigate } from "react-router-dom";


function CreateChapter() {
    const [formData, setFormData] = useState({
        // Initial state of form
        chapterNumber: { chapterNumber },
        title: "",
        outline: "",
        text: ""
    });
    // Retrieve bookId
    const { bookId } = useParams();
    // Automatically navigate to other route
    const navigate = useNavigate();

    // Updates the formData state when the value of the input changes
    const handleChange = (e) => {
        const {name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        chaptersService.createChapter(formData)
            // Navigate to page of chapter that was created
            .then(response => {
                navigate(`/chapters/${response.data._id}`);
            })
            .catch(error => {
                console.error("Error creating chapter:", error);
            });
        };

    // If cancel is clicked, navigate to the chapter's book
    const handleCancel = () => {
        navigate(`/books/${bookId}`);
    };

    return (
        <div>
            <h2> Create new chapter </h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )

}

  
  export default CreateChapter;