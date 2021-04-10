import { IHyunjinMessageHandler } from '../interfaces/IHyunjinMessageHandler';

const pingMessage : IHyunjinMessageHandler = {
    label: 'pingMessenger',
    trigger: () => true,
    generator: (msg) => {
        // Not implemented
    },
};

export default pingMessage;
