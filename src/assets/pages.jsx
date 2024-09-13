import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HomeIcon from '@mui/icons-material/Home';

export const pages = {
    home: {
        title: 'HOME',
        leftText: 'Create',
        leftIcon: <ControlPointIcon/>,
        leftLink: '/create'
    },
    newEvent: {
        title: 'NEW EVENT CREATION',
        leftText: 'Home',
        leftIcon: <HomeIcon/>,
        leftLink: '/home'
    },
    event: {
        title: 'EVENT DESCRIPTION',
        leftText: 'Home',
        leftIcon: <HomeIcon/>,
        leftLink: '/home'
    },
    editEvent: {
        title: 'EDIT EVENT DESCRIPTION',
        leftText: 'Home',
        leftIcon: <HomeIcon/>,
        leftLink: '/home'
    },
};