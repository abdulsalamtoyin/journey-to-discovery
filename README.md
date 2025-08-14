# Journey to Discovery - Bible Study App

A React Native mobile application for bible study management with admin capabilities, built with Expo.

## Features

- **Study Categories**: Browse studies by categories (Discipleship, Fellowship, Leadership, etc.)
- **Search & Filter**: Find studies by title, description, or category
- **Save Studies**: Bookmark favorite studies for easy access
- **Admin Panel**: Admin login to add, edit, and delete study materials
- **Responsive Design**: Clean, modern UI optimized for mobile devices

## Screenshots

The app replicates the design shown in the provided screenshots with:
- Welcome screen with category grid
- Study listing and detail views
- Saved studies management
- Admin dashboard for content management

## Prerequisites

Before running this project on your MacBook Pro, ensure you have:

1. **Node.js** (v16 or later)
   ```bash
   # Check your Node.js version
   node --version
   
   # If you need to install Node.js, download from https://nodejs.org/
   # Or use Homebrew:
   brew install node
   ```

2. **Expo CLI**
   ```bash
   npm install -g expo-cli
   # or
   npm install -g @expo/cli
   ```

3. **iOS Simulator** (for iOS testing)
   - Install Xcode from the Mac App Store
   - Open Xcode and install iOS Simulator

4. **Android Studio** (for Android testing - optional)
   - Download from https://developer.android.com/studio

## Installation & Setup

1. **Create the project directory**
   ```bash
   mkdir journey-to-discovery
   cd journey-to-discovery
   ```

2. **Copy all the provided files** into the project directory with the following structure:
   ```
   journey-to-discovery/
   ├── package.json
   ├── app.json
   ├── babel.config.js
   ├── App.js
   ├── README.md
   └── src/
       ├── context/
       │   ├── AuthContext.js
       │   └── StudyContext.js
       └── screens/
           ├── HomeScreen.js
           ├── StudiesScreen.js
           ├── SavedScreen.js
           ├── ProfileScreen.js
           ├── AdminLoginScreen.js
           ├── AdminDashboardScreen.js
           ├── CategoryScreen.js
           └── StudyDetailScreen.js
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

## Running the App

### On iOS Simulator
1. After running `npx expo start`, press `i` to open iOS Simulator
2. The app will build and launch automatically

### On Android Emulator
1. Start Android Studio and create/start an AVD (Android Virtual Device)
2. After running `npx expo start`, press `a` to open Android Emulator

### On Physical Device
1. Install Expo Go app from App Store (iOS) or Google Play Store (Android)
2. After running `npx expo start`, scan the QR code with your device

## Admin Features

The app includes admin functionality for managing study content:

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Admin Capabilities
- Add new bible studies
- Edit existing studies  
- Delete studies
- Assign studies to categories
- View content statistics

### Accessing Admin Panel
1. Go to Profile tab
2. Tap "Admin Login" 
3. Enter credentials
4. Access admin dashboard to manage content

## App Structure

### Main Components

- **HomeScreen**: Welcome page with category grid and recent studies
- **StudiesScreen**: Browse and search all studies
- **SavedScreen**: View bookmarked studies
- **ProfileScreen**: User profile and app settings
- **CategoryScreen**: Studies filtered by category
- **StudyDetailScreen**: Full study content view
- **AdminLoginScreen**: Admin authentication
- **AdminDashboardScreen**: Content management interface

### Data Management

The app uses React Context for state management with local AsyncStorage persistence:

- **AuthContext**: Handles admin authentication
- **StudyContext**: Manages studies, categories, and saved items

### Sample Data

The app comes with sample categories and a few example studies. Admin can add more content through the admin panel.

## Customization

### Adding New Categories

Edit `src/context/StudyContext.js` and modify the `defaultCategories` array:

```javascript
{
  id: 'new-category',
  name: 'New Category',
  icon: 'icon-name', // Ionicons name
  color: '#color-hex',
  backgroundColor: '#background-color-hex',
}
```

### Changing Admin Credentials

Edit `src/context/AuthContext.js` and modify:

```javascript
const ADMIN_USERNAME = 'your-username';
const ADMIN_PASSWORD = 'your-password';
```

### Styling

The app uses a consistent design system with:
- Primary color: `#4F46E5` (Indigo)
- Typography: System fonts with consistent sizing
- Layout: Flexbox with proper spacing
- Icons: Expo Vector Icons (Ionicons)

## Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start -c
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS Simulator not opening**
   - Ensure Xcode is installed
   - Open Xcode and accept license agreements
   - Check iOS Simulator is available

4. **Android emulator issues**
   - Ensure Android Studio is properly configured
   - Start emulator before running expo

### Dependencies Issues

If you encounter any dependency conflicts, try:

```bash
npm install --legacy-peer-deps
```

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both iOS and Android
5. Submit a pull request

## License

This project is created as a demonstration app. Customize as needed for your specific use case.

## Support

For technical issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure you're using compatible Node.js version
4. Check Expo documentation: https://docs.expo.dev/

## Version History

- **v1.0.0**: Initial release with core features and admin panel
