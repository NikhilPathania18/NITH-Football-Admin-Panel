import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Overview, Documentation, ChangeLog, Error } from "./pages/supports";
import { Avatars, Alerts, Buttons, Charts, Tables, Fields, Headings, Colors } from "./pages/blocks";
import { Dashboard, ForgotPassword, Register, Login, UserList, UserProfile, MyAccount, 
    TripList, TripUpload, InvoiceList, InvoiceDetails, OrderList, CreateAddons, Settings } from "./pages/master";
import AddBoat from "./pages/master/NewTournament";
import BoatList from "./pages/master/TournamentList";
import AddOnList from "./pages/master/TeamsList";
import BoatView from "./pages/master/ViewTournament";
import EditBoat from "./pages/master/EditTournament";
import Faqs from "./pages/master/AddFaq";
import FaqList from "./pages/master/FaqList";
import EditTrip from "./pages/master/UpdatePlayer";
import EditAddon from "./pages/master/UpdateTeamDetails";
import Gallery from "./pages/master/CreateGallery";
import EditGallery from "./pages/master/EditGallery";
import EditFaq from "./pages/master/EditFaq";
import AddonView from "./pages/master/TeamView";
import FaqView from "./pages/master/FaqView";
import CreateBlog from "./pages/master/NewMatch";
import EditBlog from "./pages/master/UpdateMatch";
import BlogView from "./pages/master/BlogView";
import CreatePromo from "./pages/master/CreatePromo";
import PromoList from "./pages/master/PromoList";
import EditPromo from "./pages/master/EditPromo";
import PromoView from "./pages/master/PromoView";
import { ToastContainer,  Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomerQuestionsList from "./pages/master/CustomerQuestionsList";
import AboutUs from "./pages/master/LiveMatch";
import BookingList from "./pages/master/BookingList";
import AddPlayer from "./pages/master/AddPlayer";
import PlayerList from "./pages/master/PlayerList";
import PlayerDetails from './pages/master/PlayerDetails';
import UpdatePlayer from "./pages/master/UpdatePlayer";
import CreateTeam from "./pages/master/CreateTeam";
import TeamsList from "./pages/master/TeamsList";
import TeamView from "./pages/master/TeamView";
import MatchesList from "./pages/master/MatchesList";
import NewMatch from "./pages/master/NewMatch";
import UpdateMatch from "./pages/master/UpdateMatch";
import LiveMatch from "./pages/master/LiveMatch";
import NewTournament from "./pages/master/NewTournament";
import TournamentList from "./pages/master/TournamentList";
import TournamentView from "./pages/master/ViewTournament";
import EditTournament from "./pages/master/EditTournament";
import AddNews from "./pages/master/AddNews";
import NewsList from "./pages/master/NewsList";

export default function App() {
    return (
        <ThemeProvider>
            <LoaderProvider>
                <BrowserRouter>
                <ToastContainer 
                    position='top-center'
                    pauseOnHover={false}
                    autoClose={1500}
                    transition={Bounce}
                    hideProgressBar={true}
                    closeOnClick={true}
                    limit={1}
                    theme='colored'
                    icon={true}
                    closeButton={false}
                />
                    <Routes>
                        {/* master Pages */}
                        <Route path="/" element={<Dashboard /> } />
                        <Route path="/ecommerce" element={<Dashboard /> } />
                        {/* <Route path="/" element={<Login />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/user-list" element={<UserList />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/my-account" element={<MyAccount />} />

                        <Route path="/bookings" element={<BookingList />} />

                        <Route path="/player-list" element={<PlayerList />} />
                        <Route path="/player-details/:id" element={<PlayerDetails />} />
                        <Route path="/add-player" element={<AddPlayer />} />
                        <Route path="/update-player/:id" element={<UpdatePlayer />} />

                        <Route path="/tournament-list" element={<TournamentList />} />
                        <Route path="/new-tournament" element = {<NewTournament />} />
                        <Route path="/view-tournament/:id" element = {<TournamentView />} />
                        <Route path="/edit-tournament/:id" element = {<EditTournament />} />

                        <Route path="/invoice-list" element={<InvoiceList />} />
                        <Route path="/invoice-details" element={<InvoiceDetails />} />
                        <Route path="/order-list" element={<OrderList />} />
                        <Route path="/settings" element={<Settings />} />

                        <Route path="/teams-list" element={<TeamsList />} />
                        <Route path="/create-team" element={<CreateTeam />} />
                        <Route path="/team-view/:id" element={<TeamView />} />
                        <Route path="/update-team/:id" element={<EditAddon />} />

                        <Route path="/faqs" element={<Faqs />} />
                        <Route path="/faqs-list" element={<FaqList />} />
                        <Route path="/faq-view/:id" element={<FaqView />} />
                        <Route path="/edit-faq/:id" element={<EditFaq />} />

                        <Route path="/new-news" element = {<AddNews />} />
                        <Route path="/news-list" element = {<NewsList />} /> 

                        <Route path='/gallery' element={<Gallery />} />
                        <Route path='/edit-gallery' element={<EditGallery />} />

                        <Route path='/new-match' element={<NewMatch />} /> 
                        <Route path='/matches-list' element={<MatchesList />} />
                        <Route path='/update-match/:id' element={<UpdateMatch />} />
                        <Route path='/view-match/:id' element={<BlogView />} />
                        <Route path='/live-match-update/:id' element={<LiveMatch />} />

                        <Route path='/create-promo' element={<CreatePromo />} />
                        <Route path='/promos-list' element={<PromoList />} />
                        <Route path='/edit-promo/:id' element={<EditPromo />} />
                        <Route path='/promo-view/:id' element={<PromoView />} />

                        <Route path='/customer-questions' element={<CustomerQuestionsList />} />

                        <Route path='/about-us' element={<AboutUs />} />

                        {/* Blocks Pages */} 
                        <Route path="/headings" element={<Headings />} />
                        <Route path="/buttons" element={<Buttons />} />
                        <Route path="/avatars" element={<Avatars />} />
                        <Route path="/colors" element={<Colors />} />
                        <Route path="/charts" element={<Charts />} />
                        <Route path="/tables" element={<Tables />} />
                        <Route path="/fields" element={<Fields />} />
                        <Route path="/alerts" element={<Alerts />} />

                        {/* Supports Pages */}
                        <Route path="*" element={<Error />} />
                        <Route path="/documentation" element={<Documentation />} />
                        <Route path="/changelog" element={<ChangeLog />} />
                    </Routes>
                </BrowserRouter>
            </LoaderProvider>
        </ThemeProvider>
    );
}

