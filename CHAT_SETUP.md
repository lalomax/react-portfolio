# Langbase Chat Integration Setup

This document explains how the Langbase pipe RAG integration is implemented in your portfolio.

## Architecture Overview

The implementation follows security best practices by keeping the API key on the server side:

```
Frontend (React) → Backend API (Express) → Langbase API
```

## Files Added/Modified

### Backend Files
- `server.js` - Express server with Langbase integration
- `.env` - Contains the secret API key (never expose this in frontend)

### Frontend Files
- `src/services/chatService.ts` - Service to communicate with backend API
- `src/components/ChatBot.tsx` - Interactive chat component
- `src/App.tsx` - Added ChatBot component
- `src/translations/en.json` & `src/translations/es.json` - Added chat translations

### Configuration
- `package.json` - Added new scripts and dependencies

## How to Run

### Option 1: Development (Both Frontend and Backend)

```bash
# Install dependencies (if not already done)
npm install

# Run both frontend and backend simultaneously
npm run dev:full
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Option 2: Separate Processes

```bash
# Terminal 1: Start backend server
npm run server

# Terminal 2: Start frontend development server
npm run dev
```

### Option 3: Production

For production, you'll need to:
1. Build the frontend: `npm run build`
2. Deploy the backend server to a hosting service (Vercel, Railway, etc.)
3. Update the API URL in `chatService.ts` to your production backend URL

## Security Features

✅ **API Key Protection**: The Langbase API key is stored in environment variables and only accessible on the server
✅ **CORS Enabled**: Backend properly configured for cross-origin requests
✅ **Input Validation**: Backend validates incoming messages
✅ **Error Handling**: Proper error handling on both frontend and backend

## Chat Features

- **Streaming Responses**: Real-time streaming of AI responses
- **Bilingual Support**: Chat interface supports English and Spanish
- **Responsive Design**: Works on desktop and mobile
- **Typing Indicators**: Shows when AI is generating response
- **Message History**: Maintains chat session history
- **Error Handling**: User-friendly error messages

## API Endpoints

### POST /api/chat
- **Purpose**: Send messages to Langbase pipe
- **Body**: `{ "message": "your message here" }`
- **Response**: Streaming text response

### GET /api/health
- **Purpose**: Health check endpoint
- **Response**: `{ "status": "OK", "timestamp": "..." }`

## Environment Variables

```env
LANGBASE_API_KEY=pipe_dwPYjo596LbbFwcvnjFefFTaVRk7m9wca93HCFBbNU4mLM19bPgrrT9KAVPNh49tg1M48ns4qHe6sHb3KQbCWkd
```

## Usage

1. Start the development servers as described above
2. Open your portfolio in the browser
3. Click the chat button (message icon) in the bottom-right corner
4. Start chatting with your AI assistant!

## Customization

### To modify the chat behavior:
- Edit `server.js` to change Langbase pipe configuration
- Modify `chatService.ts` to adjust API communication
- Update `ChatBot.tsx` to change UI/UX

### To add new translations:
- Add keys to `src/translations/en.json` and `src/translations/es.json`
- Use the `t()` function in components

## Troubleshooting

### Common Issues:

1. **"API key not configured" error**
   - Ensure `.env` file contains the LANGBASE_API_KEY
   - Restart the server after updating environment variables

2. **CORS errors**
   - Make sure backend server is running on port 3001
   - Check that CORS is properly configured in `server.js`

3. **Connection refused**
   - Verify both frontend and backend are running
   - Check that ports 5173 and 3001 are available

4. **Streaming not working**
   - Ensure Langbase API key is valid
   - Check browser console for JavaScript errors

## Production Deployment

For production deployment:

1. **Backend**: Deploy to a service like Vercel, Railway, or AWS
2. **Frontend**: Deploy to Vercel, Netlify, or similar
3. **Environment**: Set production environment variables
4. **CORS**: Update CORS origins to match your production domain
5. **API URL**: Update `chatService.ts` with production backend URL

## Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure environment variables are properly set
4. Test the backend health endpoint: http://localhost:3001/api/health
