# Codeedex

Codeedex is a comprehensive user management and access control system built with Django REST Framework on the backend and React on the frontend. It provides role-based access control (RBAC), user authentication, team management, permissions management, and detailed audit logging for secure and efficient user administration.

## Features

- **User Authentication**: Secure login and registration with JWT tokens and automatic token refresh
- **Role-Based Access Control (RBAC)**: Flexible permission system with roles, permissions, and user-role assignments with optional time-based validity
- **Team Management**: Organize users into teams for better organization
- **Permissions Management**: Granular permissions with codes and descriptions, assignable to roles
- **User Management**: Complete CRUD operations for users with team assignments
- **Audit Logging**: Comprehensive tracking of all administrative actions (create, update, delete) with timestamps and actor information
- **Admin Dashboard**: Intuitive interface for managing users, roles, permissions, teams, and viewing audit logs
- **Responsive UI**: Modern React frontend with Tailwind CSS, featuring forms, navigation, and data tables
- **Custom Permission Checks**: Advanced permission validation with role-based and direct permissions, including scope-based access (global, self, team)

## Tech Stack

### Backend
- **Django 4.x** - Web framework
- **Django REST Framework** - API development with custom permission classes
- **PostgreSQL** - Relational database with custom table names
- **JWT Authentication** - Token-based authentication with refresh tokens
- **CORS** - Cross-origin resource sharing for frontend integration
- **python-dotenv** - Environment variable management
- **Pillow** - Image handling (for future profile pictures)

### Frontend
- **React 19** - UI library with modern hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router 7** - Client-side routing with protected routes
- **Axios** - HTTP client with interceptors for JWT handling
- **React Hook Form** - Efficient form handling with validation
- **React Hot Toast** - User-friendly notifications
- **PostCSS & Autoprefixer** - CSS processing

## Database Schema

### Core Models
- **User**: Custom user model with email uniqueness, team association
- **Team**: User organization groups
- **Permission**: Granular permissions with unique codes
- **Role**: Collections of permissions
- **UserRole**: Many-to-many relationship between users and roles with optional start/end dates
- **AuditLog**: Action tracking with actor, action description, and timestamp

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- Git

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend/src/codeedex_project
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: ../../venv/Scripts/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the `codeedex_project` directory with:
   ```
   SECRET_KEY=your-super-secret-key-here-change-this-in-production
   DEBUG=True
   DB_NAME=codeedex_db
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   FRONTEND_URL=http://localhost:5173
   ```

5. Create PostgreSQL database:
   ```sql
   CREATE DATABASE codeedex_db;
   CREATE USER your_db_username WITH PASSWORD 'your_db_password';
   GRANT ALL PRIVILEGES ON DATABASE codeedex_db TO your_db_username;
   ```

6. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

8. (Optional) Load initial permissions:
   You can create initial permissions via the API or Django admin after setup.

9. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The backend API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/codeedex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints

The API is available at `http://127.0.0.1:8000/api/v1/`

### Authentication
- `POST /api/v1/accounts/login/` - User login (returns access & refresh tokens)
- `POST /api/v1/accounts/register/` - User registration
- `POST /api/v1/accounts/token/refresh/` - Refresh JWT access token

### Teams
- `GET /api/v1/accounts/teams/` - List all teams
- `POST /api/v1/accounts/teams/` - Create new team
- `PUT /api/v1/accounts/teams/{id}/` - Update team
- `DELETE /api/v1/accounts/teams/{id}/` - Delete team

### Users
- `GET /api/v1/accounts/users/` - List all users
- `POST /api/v1/accounts/users/` - Create new user
- `PUT /api/v1/accounts/users/{id}/` - Update user
- `DELETE /api/v1/accounts/users/{id}/` - Delete user
- `GET /api/v1/accounts/user-permissions/` - Get current user's permissions

### Roles & Permissions
- `GET /api/v1/access_control/roles/` - List all roles
- `POST /api/v1/access_control/roles/` - Create new role
- `PUT /api/v1/access_control/roles/{id}/` - Update role
- `DELETE /api/v1/access_control/roles/{id}/` - Delete role

- `GET /api/v1/access_control/permissions/` - List all permissions
- `POST /api/v1/access_control/permissions/` - Create new permission
- `DELETE /api/v1/access_control/permissions/{id}/` - Delete permission

### Audit Logs
- `GET /api/v1/audit/logs/` - List all audit logs with actor and timestamp

### Permission System
The system uses custom permission checking with the following scopes:
- **Role-based**: Permissions assigned through user roles
- **Direct permissions**: Individual permissions assigned to users (not implemented in current UI)
- **Scopes**: global, self (own data), team (team members' data)

Required permissions for actions:
- `view_users`, `create_user`, `edit_user`, `delete_user`
- `view_roles`, `create_role`, `edit_role`, `delete_role`
- `create_permission`, `delete_permission`
- `view_teams`, `create_team`, `edit_team`, `delete_team`
- `view_audit_logs`

## Usage

1. Access the frontend at `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Navigate through the admin dashboard to:
   - Manage users (create, edit, delete, assign to teams)
   - Create and manage roles with associated permissions
   - Define permissions with unique codes
   - Organize users into teams
   - Assign roles to users
   - View comprehensive audit logs of all administrative actions




### Code Quality
- Backend: Follow Django best practices, use meaningful model field names
- Frontend: ESLint configuration for code consistency
- Database: Custom table names for better organization

## Security Features

- JWT token authentication with refresh mechanism
- CORS configuration for secure API access
- Custom permission system preventing unauthorized actions
- Audit logging for accountability
- Password validation and secure user creation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Future Enhancements

- User profile pictures (Pillow already included)
- Bulk user/role operations
- Advanced permission scopes and inheritance
- Email notifications for user actions
- API rate limiting
- Two-factor authentication
- Dashboard analytics and reporting

## License

This project is licensed under the MIT License - see the LICENSE file for details.