import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      label="Pesquise pelo equipamento desejado."
      variant="outlined"
      value={searchValue}
      onChange={handleSearchChange}
      fullWidth
      sx={{ width: '400px' }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="Search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;