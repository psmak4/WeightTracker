CREATE TABLE [dbo].[UserLogins] (
    [LoginProvider]   NVARCHAR (128) NOT NULL,
    [ProviderKey]     NVARCHAR (128) NOT NULL,
    [UserId]          NVARCHAR (128) NOT NULL,
    [IdentityUser_Id] NVARCHAR (128) NULL,
    CONSTRAINT [PK_dbo.UserLogins] PRIMARY KEY CLUSTERED ([LoginProvider] ASC, [ProviderKey] ASC, [UserId] ASC),
    CONSTRAINT [FK_dbo.UserLogins_dbo.Users_IdentityUser_Id] FOREIGN KEY ([IdentityUser_Id]) REFERENCES [dbo].[Users] ([Id])
);

