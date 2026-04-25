import {Test, TestingModule} from '@nestjs/testing';
import {MailerService} from '@nestjs-modules/mailer';
import {EmailService} from './email.service';

describe('MailService', () => {
    let service: EmailService;
    let mailerService: MailerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EmailService,
                {
                    provide: MailerService,
                    useValue: {sendMail: jest.fn().mockResolvedValue({})},
                },
            ],
        }).compile();

        service = module.get<EmailService>(EmailService);
        mailerService = module.get<MailerService>(MailerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should send congrats email', async () => {
        const email = 'asdf@example.com';
        const name = 'Ольга Николаевна';
        const event = 'С днем нарадження';

        await service.sendCongrats(email, name, event);

        expect(mailerService.sendMail).toHaveBeenCalledWith({
            to: email,
            subject: expect.any(String),
            template: '/congrats',
            context: {name, event},
        });
    });
});
