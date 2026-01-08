# Admin Panel Access

## Secure Admin URLs

The admin panel uses a secure, non-guessable URL path to prevent unauthorized access.

### Access URLs:

- **Dashboard**: `http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/dashboard`
- **Business Management**: `http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/businesses`
- **Pending Approvals**: `http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/pending`

### Changing the Admin Path

To change the secure admin path, edit `src/config/adminConfig.js`:

```javascript
export const ADMIN_BASE_PATH = '/manage-YOUR-NEW-SECURE-PATH-HERE'
```

**Recommendations for a secure path:**
- Use a long random string (20+ characters)
- Mix letters and numbers
- Avoid dictionary words or patterns
- Example: `/manage-a7f3b9c2d4e1f6g8h2j4k6m8`

### Security Notes

⚠️ **Important**: This is URL-based security only. For production use, you should:

1. Add authentication (Firebase Auth)
2. Implement role-based access control
3. Use environment variables for the admin path
4. Consider IP whitelisting for additional security
5. Use HTTPS in production

The current setup provides basic obscurity but should not be relied upon as the sole security measure.

