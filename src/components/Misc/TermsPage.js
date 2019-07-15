import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.secondary.main,
        textDecoration: 'none'
    }
}));

export default function TermsPage() {
    const classes = useStyles();

    return (
        <div>
            <Typography variant='h4'>Terms of Service</Typography>
            <br/><br/>

            <Typography variant='h5'>1. Terms</Typography>
            <br/>
            <Typography variant='body1'>By accessing the website at <a href="http://coindrop.me"
                                                                       className={classes.link}>http://coindrop.me</a>,
                you are agreeing to be
                bound by these terms of service, all applicable laws and regulations, and agree that you are responsible
                for compliance with any applicable local laws. If you do not agree with any of these terms, you are
                prohibited from using or accessing this site. The materials contained in this website are protected by
                applicable copyright and trademark law.
            </Typography>
            <br/>

            <Typography variant='h5'>2. Use License</Typography>
            <ol type="a">
                <li>
                    <Typography variant='body1'>
                        Permission is granted to temporarily download one copy of the materials (information or
                        software) on
                        Coindrop's website for personal, non-commercial transitory viewing only. This is the grant of a
                        license, not a transfer of title, and under this license you may not:
                    </Typography>
                    <ol type="i">
                        <Typography variant='body1'>
                            <li>modify or copy the materials;</li>
                            <li>use the materials for any commercial purpose, or for any public display (commercial or
                                non-commercial);
                            </li>
                            <li>attempt to decompile or reverse engineer any software contained on Coindrop's website;
                            </li>
                            <li>remove any copyright or other proprietary notations from the materials; or</li>
                            <li>transfer the materials to another person or "mirror" the materials on any other
                                server.
                            </li>
                        </Typography>
                    </ol>
                </li>
                <Typography variant='body1'>
                    <li>
                        This license shall automatically terminate if you violate any of these restrictions and may be
                        terminated by Coindrop at any time. Upon terminating your viewing of these materials or upon the
                        termination of this license, you must destroy any downloaded materials in your possession
                        whether in
                        electronic or printed format.
                    </li>
                </Typography>
            </ol>
            <br/>

            <Typography variant='h5'>3. Disclaimer</Typography>
            <ol type="a">
                <Typography variant='body1'>
                    <li>The materials on Coindrop's website are provided on an 'as is' basis. Coindrop makes no
                        warranties,
                        expressed or implied, and hereby disclaims and negates all other warranties including, without
                        limitation, implied warranties or conditions of merchantability, fitness for a particular
                        purpose,
                        or non-infringement of intellectual property or other violation of rights.
                    </li>
                    <li>Further, Coindrop does not warrant or make any representations concerning the accuracy, likely
                        results, or reliability of the use of the materials on its website or otherwise relating to such
                        materials or on any sites linked to this site.
                    </li>
                </Typography>
            </ol>
            <br/>

            <Typography variant='h5'>4. Limitations</Typography>
            <Typography variant='body1'>In no event shall Coindrop or its suppliers be liable for any damages
                (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Coindrop's website, even if Coindrop or a Coindrop authorized representative has
                been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not
                allow limitations on implied warranties, or limitations of liability for consequential or incidental
                damages, these limitations may not apply to you.
            </Typography>
            <br/>

            <Typography variant='h5'>5. Accuracy of materials</Typography>
            <Typography variant='body1'>The materials appearing on Coindrop's website could include technical,
                typographical, or photographic
                errors. Coindrop does not warrant that any of the materials on its website are accurate, complete or
                current. Coindrop may make changes to the materials contained on its website at any time without notice.
                However Coindrop does not make any commitment to update the materials.
            </Typography>
            <br/>

            <Typography variant='h5'>6. Links</Typography>
            <Typography variant='body1'>Coindrop has not reviewed all of the sites linked to its website and is not
                responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by Coindrop of the site.
                Use of any such linked website is at the user's own risk.
            </Typography>
            <br/>

            <Typography variant='h5'>7. Modifications</Typography>
            <Typography variant='body1'>Coindrop may revise these terms of service for its website at any time without
                notice. By using this
                website you are agreeing to be bound by the then current version of these terms of service.
            </Typography>
            <br/>

            <Typography variant='h5'>8. Governing Law</Typography>
            <Typography variant='body1'>These terms and conditions are governed by and construed in accordance with the
                laws of Canada and you
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </Typography>

            <br/><br/><br/>

            <Typography variant='h4'>Privacy Policy</Typography>
            <br/><br/>

            <Typography variant='body1'>Your privacy is important to us. It is Coindrop's policy to respect your privacy
                regarding any
                information we may collect from you across our website, <a className={classes.link}
                                                                           href="http://coindrop.me">http://coindrop.me</a>,
                and other sites we own and operate.
            </Typography>
            <br/>
            <Typography variant='body1'>We only ask for personal information when we truly need it to provide a service
                to you. We collect it by
                fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and
                how it will be used.
            </Typography>
            <br/>
            <Typography variant='body1'>We only retain collected information for as long as necessary to provide you
                with your requested service.
                What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as
                well as unauthorised access, disclosure, copying, use or modification.
            </Typography>
            <br/>
            <Typography variant='body1'>We don’t share any personally identifying information publicly or with
                third-parties, except when
                required to by law.
            </Typography>
            <br/>
            <Typography variant='body1'>Our website may link to external sites that are not operated by us. Please be
                aware that we have no
                control over the content and practices of these sites, and cannot accept responsibility or liability for
                their respective privacy policies.
            </Typography>
            <br/>
            <Typography variant='body1'>You are free to refuse our request for your personal information, with the
                understanding that we may be
                unable to provide you with some of your desired services.
            </Typography>
            <br/>
            <Typography variant='body1'>Your continued use of our website will be regarded as acceptance of our
                practices around privacy and
                personal information. If you have any questions about how we handle user data and personal information,
                feel free to contact us.
            </Typography>
            <br/>
            <Typography variant='body1'>This policy is effective as of 14 July 2019.</Typography>
        </div>
    )
}