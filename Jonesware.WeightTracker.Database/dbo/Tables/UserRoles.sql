CREATE TABLE [dbo].[UserRoles] (
    [UserId]          NVARCHAR (128) NOT NULL,
    [RoleId]          NVARCHAR (128) NOT NULL,
    [IdentityUser_Id] NVARCHAR (128) NULL,
    CONSTRAINT [PK_dbo.UserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC),
    CONSTRAINT [FK_dbo.UserRoles_dbo.Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_dbo.UserRoles_dbo.Users_IdentityUser_Id] FOREIGN KEY ([IdentityUser_Id]) REFERENCES [dbo].[Users] ([Id])
);

