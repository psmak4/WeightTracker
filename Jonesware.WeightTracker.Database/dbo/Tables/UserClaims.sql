CREATE TABLE [dbo].[UserClaims] (
    [Id]              INT            IDENTITY (1, 1) NOT NULL,
    [UserId]          NVARCHAR (MAX) NULL,
    [ClaimType]       NVARCHAR (MAX) NULL,
    [ClaimValue]      NVARCHAR (MAX) NULL,
    [IdentityUser_Id] NVARCHAR (128) NULL,
    CONSTRAINT [PK_dbo.UserClaims] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_dbo.UserClaims_dbo.Users_IdentityUser_Id] FOREIGN KEY ([IdentityUser_Id]) REFERENCES [dbo].[Users] ([Id])
);

