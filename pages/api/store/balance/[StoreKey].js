import connectionHandler from '../../../../src/config/connection-handler';

const handler = async (req, res) => {
    try {
        if (req.method === 'PATCH') {
            const data = await req
                .db('Stores')
                .where({ StoreKey: req.query.StoreKey })
                .update({
                    StoreName: req.body.StoreName,
                    StoreAddress1: req.body.StoreAddress1,
                    StoreAddress2: req.body.StoreAddress2,
                    StorePhone: req.body.StorePhone,
                    StoreCity: req.body.StoreCity,
                    StoreState: req.body.StoreState,
                    StoreZip: req.body.StoreZip,
                    MailingAddress1: req.body.MailingAddress1,
                    MailingAddress2: req.body.MailingAddress2,
                    MailingCity: req.body.MailingCity,
                    MailingState: req.body.MailingState,
                    MailingZip: req.body.MailingZip,
                    Comments: req.body.Comments,
                    Salesperson: req.body.Salesperson,
                    StoreBlocked: req.body.StoreBlocked,
                    SalespersonPercentage: req.body.SalespersonPercentage,
                    Settings: JSON.stringify(req.body.Settings),
                    UserKey_LastUpdatedBy: req.body.UserKey_LastUpdatedBy,
                    UserKey_CreatedBy: req.body.UserKey_CreatedBy,
                    StoreCreateTS: new Date(),
                    StoreLastUpdatedDateTime: new Date(),
                });

            if (data && data.length < 1) {
                return res.status(404).json({
                    message: `Store not found with given StoreKey  - ${req.query.StoreKey}`,
                });
            }

            return res.status(201).send({ message: 'Store Edited Succesfully.' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Oops! Something went wrong!', error });
    }
};

export default connectionHandler()(handler);
