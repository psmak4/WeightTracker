CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Username] NVARCHAR(50) NOT NULL, 
    [Password] NVARCHAR(60) NOT NULL, 
    [Email] NVARCHAR(100) NOT NULL, 
    [IsActive] BIT NOT NULL
)
