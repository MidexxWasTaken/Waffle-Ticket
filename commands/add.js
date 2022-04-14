module.exports = {
    data: {
        name: 'add',
        type: 1,
        description: 'Add a user to the ticket!',
        ephemeral: true,
        options: [
            { type: 6, name: 'member', description: 'Member ID to add to the channel', required: true }
        ]
    },
    async execute(i) {
        const user = i.options.getUser('member');
        if (!i.channel.name.startsWith('ticket-')) return i.reply({ content: '*You can only use this command in a ticket channel.*' });
        if (!i.member.permissions.has('MANAGE_CHANNELS')) return i.reply({ content: '*You must be an administrator to run this command.*' });
         if (i.channel.permissionsFor(user).has('VIEW_CHANNEL')) return i.reply({ content: `<@${user.id}> already has permissions to this channel.*` });

        i.channel.permissionOverwrites.edit(i.options.getMember('member').user, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,
            READ_MESSAGE_HISTORY: true
          })

        i.channel.send('Successfully added the member to the channel')

    }
}