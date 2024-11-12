function SearchInput({ placeHolder, onSearchChange }) {
    return (
       
                <form action="">
                    <input 
                        type="text" 
                        name="searchInput" 
                        id="searchInput" 
                        placeholder={placeHolder} 
                        className="text-sm w-full px-4 py-3 rounded-md border outline-none focus:border-mainRedColor"
                        onChange={onSearchChange} // هنا يتم استدعاء الدالة عندما يتغير النص
                    />
                </form>

    );
}

export default SearchInput;
