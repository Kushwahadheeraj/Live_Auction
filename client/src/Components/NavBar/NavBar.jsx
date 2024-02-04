import { useState, React } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import NavFlexBetween from "../FlexBetween/NavFlexBetween";
import logo from '../../Assets/Logo.png'
const Navbar = () => {
  
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id } = useSelector((state) => state.user)
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;
  const fullName = `${user.firstName}`;
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    console.log(search);
    navigate(`/search/${search}`)
  };

  return (
    <NavFlexBetween padding="1rem 6%" backgroundColor={alt}>
      <NavFlexBetween gap="1.75rem">
        <a href="/home">
          <img src={logo} width='35px' className='logo' alt="img"></img>
        </a>
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="secondary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: dark,
              cursor: "pointer",
            },
          }}
        >
            
          Live Auctions
        </Typography>
        {isNonMobileScreens && (
          <NavFlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase
            placeholder="Search..." 
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </NavFlexBetween>
        )}
      </NavFlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <NavFlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={() => navigate("/newpost")}>
            <LibraryAddIcon sx={{ fontSize: "25px",color: dark }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/notifications`)}>
            <Notifications sx={{ fontSize: "25px", color: dark }} />
          </IconButton>
          <IconButton onClick={() => navigate(`/profile/${_id}`)}>
            <PersonIcon sx={{ fontSize: "25px",color: dark }} />
          </IconButton>
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`/profile/${_id}`)}>Profile</MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </NavFlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <NavFlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={() => navigate("/newpost")}>
            <LibraryAddIcon sx={{ fontSize: "25px",color: dark }} />
            </IconButton>
            <IconButton onClick={() => navigate(`/profile/${_id}`)}>
            <PersonIcon sx={{ fontSize: "25px",color: dark }} />
            </IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate(`/profile/${_id}`)}>Profile</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </NavFlexBetween>
        </Box>
      )}
    </NavFlexBetween>
  );
};

export default Navbar;