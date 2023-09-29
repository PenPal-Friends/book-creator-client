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
        <div className="bg-gray-100 min-h-screen">

            {/* Title section */}
            <div className="bg-cover bg-center relative text-left">
                
                {/* Breadcrumb */}

                <div className="flex items-center space-x-4 mb-2">
                    <Link to="/books" className="text-white hover:underline">
                        Books
                    </Link>
                    <span className="mx-2">›</span><span className="mx-2"></span>
                    {isNewChapter ? "My chapter" : `Chapter ${formData.chapterNumber}`}
                </div><br /><br />

                <div>
                
                <input
                    className="border rounded lg:w-1/2 md:w-2/3 sm:w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Chapter title"
                /><br />
            </div>

            {/* Button nav bar */}
                <div className="flex justify-between bg-white border-b-2 border-gray-300 px-8 py-4 mb-12">
                    {!isNewChapter && 
                    <button type="button" onClick={handleDelete} className="bg-white border-2 border-red-400 text-[#333333] font-semibold text-base uppercase py-3 px-5 mr-4 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F" type="button">
                        Delete
                    </button>}
                    <div className="flex justify-end">
                        <button type="button" onClick={handleCancel} className="bg-white border-2 border-[#24978F] text-[#333333] font-semibold text-base uppercase py-3 px-5 mr-4 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F" type="button">
                            {isNewChapter ? "Cancel and discard" : "Cancel and exit"}
                        </button>
                        <button type="submit" form="chapterForm" className="bg-[#24978F] text-white font-semibold text-base uppercase py-3 px-5 rounded-full hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-24978F" type="submit" form="chapterForm">
                            {isNewChapter ? "Save" : "Save changes"}
                        </button>
                    </div>
                </div>

            {/* Form: Outline & text */}
            <div className="flex justify-center w-full">
            <form id="chapterForm" className="bg-white flex flex-col items-start p-10 lg:w-2/3 md:w-3/4 sm:w-full rounded shadow" onSubmit={handleSubmit}>
                <textarea
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline mt-2"
                    name="outline"
                    value={formData.outline}
                    onChange={handleChange}
                    placeholder="Write your outline..."
                    rows="24"
                /><br/>
                <textarea
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline mt-2"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Write your story..."
                    rows="48"
                />
            </form>
            </div>

        </div>
        </div>
    )

}

  
  export default CreateChapter;