# Login System for Admin Dashboard

## Default Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Default Password**: `admin123`

## Features
✅ Password-protected admin dashboard
✅ Secure httpOnly cookies for session management
✅ 7-day session expiration
✅ Logout functionality
✅ Automatic redirect to login if session expired

## Configuration

### Change Admin Password
1. Open `.env.local` (or create it)
2. Add or update:
   ```
   ADMIN_PASSWORD=your_new_secure_password
   ```
3. Restart the development server
4. Login with new password

### Flow
1. User visits `/admin/dashboard` or any admin route
2. If not authenticated → redirected to `/admin/login`
3. Enter password → validated against `ADMIN_PASSWORD`
4. On success → `admin_session` cookie set for 7 days
5. User can access all admin features
6. Click "Logout" to clear session

## Security Notes
- Passwords are stored in environment variables (not in code)
- Sessions use httpOnly cookies (can't be accessed by JavaScript)
- Cookies are marked `Secure` in production (HTTPS only)
- Sessions expire after 7 days of inactivity
- Change the default password immediately!

## Accessing Admin Dashboard
After logging in:
- **Dashboard**: `/admin/dashboard` - View stats and overview
- **All Messages**: `/admin/messages` - Search and filter all messages
- **Contact Messages**: `/admin/messages?type=contact` - View contact inquiries
- **Career Applications**: `/admin/messages?type=career` - View job applications
- **Message Details**: `/admin/messages/[id]` - View full message details

## Production Recommendations
1. Use a strong password (mix of uppercase, lowercase, numbers, special chars)
2. Consider implementing:
   - Username + password authentication
   - Multi-factor authentication (MFA)
   - Rotate passwords regularly
   - Use OAuth/SSO for team environments
